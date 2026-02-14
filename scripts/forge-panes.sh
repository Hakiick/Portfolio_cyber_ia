#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# forge-panes.sh — Lance une session tmux "forge" multi-agents Claude
# =============================================================================

SESSION_NAME="forge"
DEFAULT_AGENTS=("ui-integrator" "astro-react-dev" "stabilizer")
PROJECT_DIR="."
ACTION="start"

# ---------------------------------------------------------------------------
# Rôles des agents (associative array)
# ---------------------------------------------------------------------------
declare -A AGENT_ROLES=(
  ["ui-integrator"]="Spécialiste design system cyber. Tailwind CSS, variables CSS, composants UI React réutilisables, animations CSS, effets glitch/glow/néon."
  ["astro-react-dev"]="Frontend developer Astro 4.13 + React 18. Composants interactifs, pages Astro, layouts, data layer TypeScript."
  ["threejs-dev"]="Développeur 3D Three.js. Réseau de neurones 3D, animations WebGL, shaders, performance GPU."
  ["stabilizer"]="Quality gate. Build (\`npm run build\`), tests (\`npx playwright test\`), lint (\`npx prettier --check src/\`), type-check (\`./node_modules/.bin/tsc --noEmit\`). Corrige les problèmes simples, renvoie les complexes."
  ["reviewer"]="Revue de code qualité + sécurité OWASP. Analyse sans modifier."
)

# ---------------------------------------------------------------------------
# Parse arguments
# ---------------------------------------------------------------------------
AGENTS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)
      shift
      PROJECT_DIR="${1:-.}"
      shift
      ;;
    --agents)
      shift
      while [[ $# -gt 0 && ! "$1" =~ ^-- ]]; do
        AGENTS+=("$1")
        shift
      done
      ;;
    --kill)
      ACTION="kill"
      shift
      ;;
    --list)
      ACTION="list"
      shift
      ;;
    --attach)
      ACTION="attach"
      shift
      ;;
    -h|--help)
      ACTION="help"
      shift
      ;;
    *)
      echo "Option inconnue : $1"
      exit 1
      ;;
  esac
done

# Use defaults if no agents specified
if [[ ${#AGENTS[@]} -eq 0 ]]; then
  AGENTS=("${DEFAULT_AGENTS[@]}")
fi

# Resolve project dir to absolute path
PROJECT_DIR="$(cd "$PROJECT_DIR" && pwd)"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
print_header() {
  echo ""
  echo "============================================"
  echo "  FORGE — Multi-Agent Claude Orchestrator"
  echo "============================================"
  echo ""
}

check_dependencies() {
  local missing=0
  if ! command -v tmux &>/dev/null; then
    echo "[ERREUR] tmux n'est pas installé ou pas dans le PATH."
    echo "         Installe-le avec : sudo apt install tmux"
    missing=1
  fi
  if ! command -v claude &>/dev/null; then
    echo "[ERREUR] claude n'est pas installé ou pas dans le PATH."
    echo "         Installe-le avec : npm install -g @anthropic-ai/claude-code"
    missing=1
  fi
  if [[ $missing -eq 1 ]]; then
    exit 1
  fi
}

session_exists() {
  tmux has-session -t "$SESSION_NAME" 2>/dev/null
}

# ---------------------------------------------------------------------------
# Actions
# ---------------------------------------------------------------------------
do_help() {
  print_header
  cat <<'USAGE'
Usage:
  bash scripts/forge-panes.sh [OPTIONS]

Options:
  --project PATH          Répertoire du projet (défaut : .)
  --agents AGENT1 AGENT2  Agents à lancer (défaut : ui-integrator astro-react-dev stabilizer)
  --kill                  Ferme la session forge
  --list                  Liste les agents actifs et leurs panes
  --attach                Rejoint la session forge existante
  -h, --help              Affiche cette aide

Agents disponibles:
  ui-integrator    Design system cyber, Tailwind, animations
  astro-react-dev  Frontend Astro 4.13 + React 18
  threejs-dev      3D Three.js, WebGL, shaders
  stabilizer       Quality gate (build, test, lint, type-check)
  reviewer         Revue de code qualité + sécurité OWASP
USAGE
}

do_kill() {
  if session_exists; then
    tmux kill-session -t "$SESSION_NAME"
    echo "[OK] Session '$SESSION_NAME' fermée."
  else
    echo "[INFO] Aucune session '$SESSION_NAME' active."
  fi
}

do_list() {
  if ! session_exists; then
    echo "[INFO] Aucune session '$SESSION_NAME' active."
    exit 0
  fi
  echo ""
  echo "Session : $SESSION_NAME"
  echo "-------------------------------------------"
  printf "%-8s %-20s %s\n" "PANE" "NOM" "COMMANDE"
  echo "-------------------------------------------"
  tmux list-panes -t "$SESSION_NAME" -F "#{pane_index} #{pane_title} #{pane_current_command}" | \
    while read -r idx title cmd; do
      printf "%-8s %-20s %s\n" "$idx" "$title" "$cmd"
    done
  echo "-------------------------------------------"

  # Show status files if they exist
  local forge_dir="$PROJECT_DIR/.forge/status"
  if [[ -d "$forge_dir" ]]; then
    echo ""
    echo "Statuts agents :"
    for f in "$forge_dir"/*; do
      [[ -f "$f" ]] || continue
      local agent_name
      agent_name="$(basename "$f")"
      local status
      status="$(cat "$f")"
      printf "  %-20s %s\n" "$agent_name" "$status"
    done
  fi
}

do_attach() {
  if ! session_exists; then
    echo "[ERREUR] Aucune session '$SESSION_NAME' active. Lance d'abord le script sans --attach."
    exit 1
  fi
  exec tmux attach-session -t "$SESSION_NAME"
}

build_system_prompt() {
  local agent_name="$1"
  local agent_role="${AGENT_ROLES[$agent_name]:-Agent générique.}"

  cat <<SYSPROMPT
Tu es l'agent ${agent_name} du projet Portfolio Cyber x IA (Hakick).

## Ton rôle
${agent_role}

## Règles strictes
1. Lis CLAUDE.md pour le contexte complet du projet
2. Vérifie ta branche avec \`git branch --show-current\` avant de commencer
3. Fais des commits atomiques au format : type(scope): description
4. NE JAMAIS push — seul l'orchestrateur push
5. Quand tu reçois une tâche, lis-la depuis .forge/tasks/${agent_name}.md
6. Quand tu termines, écris ton résultat dans .forge/results/${agent_name}.md
7. Quand tu termines, écris "done" dans .forge/status/${agent_name}

## Démarrage
Attends qu'une tâche apparaisse. L'orchestrateur t'enverra des instructions via le terminal.
SYSPROMPT
}

do_start() {
  check_dependencies

  # If session already exists, don't overwrite
  if session_exists; then
    echo "[ATTENTION] La session '$SESSION_NAME' existe déjà."
    echo ""
    echo "  --attach    pour rejoindre la session"
    echo "  --kill      pour la fermer et en relancer une"
    echo "  --list      pour voir les agents actifs"
    echo ""
    exit 1
  fi

  local agent_count=${#AGENTS[@]}

  # Validate agent names
  for agent in "${AGENTS[@]}"; do
    if [[ -z "${AGENT_ROLES[$agent]+x}" ]]; then
      echo "[ATTENTION] Agent '$agent' inconnu — il sera lancé avec un rôle générique."
    fi
  done

  # -----------------------------------------------------------------------
  # Create .forge/ structure
  # -----------------------------------------------------------------------
  mkdir -p "$PROJECT_DIR/.forge/tasks"
  mkdir -p "$PROJECT_DIR/.forge/results"
  mkdir -p "$PROJECT_DIR/.forge/status"

  # Initialize status to idle
  for agent in "${AGENTS[@]}"; do
    echo "idle" > "$PROJECT_DIR/.forge/status/$agent"
  done

  # -----------------------------------------------------------------------
  # Build tmux layout
  # -----------------------------------------------------------------------

  # Create session with first pane (orchestrateur)
  tmux new-session -d -s "$SESSION_NAME" -x 220 -y 55 -c "$PROJECT_DIR"
  tmux select-pane -t "$SESSION_NAME:0.0" -T "orchestrateur"

  # Split horizontal: monitor at bottom (20%)
  tmux split-window -v -t "$SESSION_NAME" -p 20 -c "$PROJECT_DIR"

  # Go back to top pane, split vertical for agents (40% right)
  tmux select-pane -t "$SESSION_NAME:0.0"
  tmux split-window -h -t "$SESSION_NAME" -p 40 -c "$PROJECT_DIR"

  # Now pane 0 = orchestrateur, pane 1 = first agent area, pane 2 = monitor
  # Split the right pane (1) into N agents vertically
  if [[ $agent_count -ge 2 ]]; then
    # Compute percentage for first split: leave space for all but the first agent
    # e.g. 3 agents: first split at 66% (bottom 2/3), second split at 50% (bottom 1/2)
    local remaining=$agent_count
    local current_pane=1
    for (( i=1; i<agent_count; i++ )); do
      remaining=$((agent_count - i))
      local percent=$(( (remaining * 100) / (remaining + 1) ))
      tmux split-window -v -t "$SESSION_NAME:0.$current_pane" -p "$percent" -c "$PROJECT_DIR"
      current_pane=$((current_pane + 1))
    done
  fi

  # -----------------------------------------------------------------------
  # Name panes and launch agents
  # -----------------------------------------------------------------------
  # After splits, pane layout:
  #   pane 0 = orchestrateur (top-left)
  #   pane 1..N = agents (right column, top to bottom)
  #   pane N+1 = monitor (bottom full-width)

  for (( i=0; i<agent_count; i++ )); do
    local pane_idx=$((i + 1))
    local agent="${AGENTS[$i]}"
    local prompt
    prompt="$(build_system_prompt "$agent")"

    tmux select-pane -t "$SESSION_NAME:0.$pane_idx" -T "$agent"
    tmux send-keys -t "$SESSION_NAME:0.$pane_idx" \
      "cd $PROJECT_DIR && claude --model sonnet --append-system-prompt \"\$(cat <<'SYSPROMPT'
${prompt}
SYSPROMPT
)\"" C-m
  done

  # Monitor pane
  local monitor_pane=$((agent_count + 1))
  tmux select-pane -t "$SESSION_NAME:0.$monitor_pane" -T "monitor"
  tmux send-keys -t "$SESSION_NAME:0.$monitor_pane" \
    "cd $PROJECT_DIR && watch -n 5 \"bash scripts/agent-status.sh 2>/dev/null || echo 'No status available'\"" C-m

  # Focus on orchestrateur pane
  tmux select-pane -t "$SESSION_NAME:0.0"

  # -----------------------------------------------------------------------
  # Print summary
  # -----------------------------------------------------------------------
  print_header
  echo "  Projet  : $PROJECT_DIR"
  echo "  Session : $SESSION_NAME"
  echo "  Agents  : ${AGENTS[*]}"
  echo ""
  echo "  Layout:"
  echo "  ┌──────────────────────────────┬───────────────────────────┐"
  echo "  │                              │                           │"
  echo "  │       ORCHESTRATEUR          │   ${AGENTS[0]:-agent-1}"
  printf "  │       (pane 0)               │   (pane 1, sonnet)        │\n"
  for (( i=1; i<agent_count; i++ )); do
    local pane_idx=$((i + 1))
    echo "  │                              ├───────────────────────────┤"
    echo "  │                              │   ${AGENTS[$i]}"
    printf "  │                              │   (pane %d, sonnet)        │\n" "$pane_idx"
  done
  echo "  ├──────────────────────────────┴───────────────────────────┤"
  echo "  │                       MONITOR (pane $monitor_pane)                      │"
  echo "  │  watch: agent-status.sh                                  │"
  echo "  └──────────────────────────────────────────────────────────┘"
  echo ""
  echo "  Commandes :"
  echo "    tmux attach -t $SESSION_NAME        Rejoindre la session"
  echo "    bash scripts/forge-panes.sh --list   Voir les agents actifs"
  echo "    bash scripts/forge-panes.sh --kill   Fermer la session"
  echo ""
  echo "  Navigation tmux :"
  echo "    Ctrl-b + flèches                    Changer de pane"
  echo "    Ctrl-b + z                          Zoom/unzoom un pane"
  echo "    Ctrl-b + d                          Détacher la session"
  echo ""
  echo "  Dossier .forge/ :"
  echo "    .forge/tasks/<agent>.md             Déposer une tâche"
  echo "    .forge/results/<agent>.md           Lire le résultat"
  echo "    .forge/status/<agent>               Statut (idle/working/done)"
  echo ""
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
case "$ACTION" in
  start)   do_start   ;;
  kill)    do_kill    ;;
  list)    do_list    ;;
  attach)  do_attach  ;;
  help)    do_help    ;;
esac

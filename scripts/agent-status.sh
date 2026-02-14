#!/usr/bin/env bash
# agent-status.sh — Tableau de bord des agents
# Usage: bash scripts/agent-status.sh
# Note: pas de set -euo pipefail pour être tolérant aux erreurs

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FORGE_DIR="$PROJECT_DIR/.forge"
SCRIPT_NAME="$(basename "$0")"

# ── Couleurs ──────────────────────────────────────────────────────────

if [[ -t 1 ]]; then
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  BLUE='\033[0;34m'
  GRAY='\033[0;90m'
  WHITE='\033[1;37m'
  NC='\033[0m'
  BOLD='\033[1m'
else
  RED=''
  GREEN=''
  YELLOW=''
  BLUE=''
  GRAY=''
  WHITE=''
  NC=''
  BOLD=''
fi

# ── Vérification du répertoire forge ─────────────────────────────────

if [[ ! -d "$FORGE_DIR/status" ]]; then
  echo -e "${YELLOW}[$SCRIPT_NAME] No .forge/status directory found. No agents registered.${NC}"
  exit 0
fi

# ── Collecter les données des agents ─────────────────────────────────

declare -a AGENTS=()
declare -A STATUSES=()
declare -A TASKS=()

max_agent_len=5   # minimum "Agent" header
max_status_len=6  # minimum "Status" header
max_task_len=4    # minimum "Task" header

for status_file in "$FORGE_DIR/status"/*; do
  [[ ! -f "$status_file" ]] && continue

  agent=$(basename "$status_file")
  AGENTS+=("$agent")

  # Lire le status
  status=$(cat "$status_file" 2>/dev/null || echo "unknown")
  STATUSES["$agent"]="$status"

  # Lire la tâche
  task_file="$FORGE_DIR/tasks/$agent.md"
  if [[ "$status" == "idle" ]]; then
    task="—"
  elif [[ -f "$task_file" ]]; then
    task=$(head -n 1 "$task_file" 2>/dev/null || echo "—")
    # Tronquer les tâches trop longues
    if [[ ${#task} -gt 50 ]]; then
      task="${task:0:47}..."
    fi
    [[ -z "$task" ]] && task="—"
  else
    task="—"
  fi
  TASKS["$agent"]="$task"

  # Calculer les largeurs
  [[ ${#agent} -gt $max_agent_len ]] && max_agent_len=${#agent}

  # Le status affiché inclut l'icône (qui prend de la place variable)
  status_display_len=${#status}
  [[ $((status_display_len + 2)) -gt $max_status_len ]] && max_status_len=$((status_display_len + 2))

  [[ ${#task} -gt $max_task_len ]] && max_task_len=${#task}
done

# ── Pas d'agents trouvés ─────────────────────────────────────────────

if [[ ${#AGENTS[@]} -eq 0 ]]; then
  echo -e "${YELLOW}[$SCRIPT_NAME] No agents found in .forge/status/${NC}"
  exit 0
fi

# ── Largeurs des colonnes (avec padding) ─────────────────────────────

col1=$((max_agent_len + 2))    # Agent + padding
col2=$((max_status_len + 4))   # Status + icon + padding
col3=$((max_task_len + 2))     # Task + padding

# Minimum widths
[[ $col1 -lt 17 ]] && col1=17
[[ $col2 -lt 8 ]] && col2=8
[[ $col3 -lt 37 ]] && col3=37

# ── Fonctions d'affichage ────────────────────────────────────────────

print_border_top() {
  printf "┌"
  printf "%-${col1}s" "" | tr ' ' '─'
  printf "┬"
  printf "%-${col2}s" "" | tr ' ' '─'
  printf "┬"
  printf "%-${col3}s" "" | tr ' ' '─'
  printf "┐\n"
}

print_border_mid() {
  printf "├"
  printf "%-${col1}s" "" | tr ' ' '─'
  printf "┼"
  printf "%-${col2}s" "" | tr ' ' '─'
  printf "┼"
  printf "%-${col3}s" "" | tr ' ' '─'
  printf "┤\n"
}

print_border_bot() {
  printf "└"
  printf "%-${col1}s" "" | tr ' ' '─'
  printf "┴"
  printf "%-${col2}s" "" | tr ' ' '─'
  printf "┴"
  printf "%-${col3}s" "" | tr ' ' '─'
  printf "┘\n"
}

pad_right() {
  local text="$1"
  local width="$2"
  local text_len=${#text}
  local pad=$((width - text_len - 1))
  [[ $pad -lt 0 ]] && pad=0
  printf "%s%*s" "$text" "$pad" ""
}

format_status() {
  local status="$1"
  case "$status" in
    idle)
      echo -e "${GRAY}⚪ idle${NC}"
      ;;
    busy)
      echo -e "${BLUE}🔵 busy${NC}"
      ;;
    done)
      echo -e "${GREEN}✅ done${NC}"
      ;;
    error)
      echo -e "${RED}❌ error${NC}"
      ;;
    *)
      echo -e "${YELLOW}? $status${NC}"
      ;;
  esac
}

# ── Affichage du tableau ─────────────────────────────────────────────

echo ""
echo -e "${BOLD}  Forge Agent Dashboard${NC}"
echo ""

print_border_top

# Header
printf "│ ${BOLD}%-$((col1 - 2))s${NC} " "Agent"
printf "│ ${BOLD}%-$((col2 - 2))s${NC} " "Status"
printf "│ ${BOLD}%-$((col3 - 2))s${NC} " "Task"
printf "│\n"

print_border_mid

# Rows
for agent in "${AGENTS[@]}"; do
  status="${STATUSES[$agent]}"
  task="${TASKS[$agent]}"

  # Agent name
  printf "│ %-$((col1 - 2))s " "$agent"

  # Status with color — on calcule le padding manuellement
  # Les emojis et codes ANSI perturbent le calcul de largeur
  local_status=$(format_status "$status")
  # Longueur visible : icône (2) + espace + status texte
  visible_len=$((${#status} + 3))
  pad=$((col2 - visible_len - 1))
  [[ $pad -lt 0 ]] && pad=0
  printf "│ %b%*s" "$local_status" "$pad" ""

  # Task
  printf "│ %-$((col3 - 2))s " "$task"

  printf "│\n"
done

print_border_bot

# ── Résumé ───────────────────────────────────────────────────────────

total=${#AGENTS[@]}
busy=0
done_count=0
idle=0
error=0

for agent in "${AGENTS[@]}"; do
  case "${STATUSES[$agent]}" in
    busy)  ((busy++)) ;;
    done)  ((done_count++)) ;;
    idle)  ((idle++)) ;;
    error) ((error++)) ;;
  esac
done

echo ""
echo -e "  ${BOLD}Total:${NC} $total agents | ${BLUE}busy: $busy${NC} | ${GREEN}done: $done_count${NC} | ${GRAY}idle: $idle${NC} | ${RED}error: $error${NC}"
echo ""

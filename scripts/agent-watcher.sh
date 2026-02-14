#!/usr/bin/env bash
set -euo pipefail

# ============================================
# AGENT WATCHER — Surveille .forge/tasks/ et lance Claude
# Usage: bash scripts/agent-watcher.sh <agent-name> [project-dir]
# ============================================

AGENT_NAME="${1:?Usage: agent-watcher.sh <agent-name> [project-dir]}"
PROJECT_DIR="${2:-$(pwd)}"
FORGE_DIR="${PROJECT_DIR}/.forge"
TASK_FILE="${FORGE_DIR}/tasks/${AGENT_NAME}.md"
RESULT_FILE="${FORGE_DIR}/results/${AGENT_NAME}.md"
STATUS_FILE="${FORGE_DIR}/status/${AGENT_NAME}"
POLL_INTERVAL=2
HEARTBEAT_INTERVAL=30
HEARTBEAT_COUNT=0

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
GRAY='\033[0;90m'
NC='\033[0m'

# Cleanup au signal
cleanup() {
    echo -e "\n${YELLOW}[${AGENT_NAME}]${NC} Arrêt du watcher..."
    echo "offline" > "${STATUS_FILE}"
    exit 0
}
trap cleanup SIGTERM SIGINT

# Initialisation
mkdir -p "${FORGE_DIR}/tasks" "${FORGE_DIR}/results" "${FORGE_DIR}/status"
echo "idle" > "${STATUS_FILE}"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  AGENT WATCHER — ${AGENT_NAME}${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GRAY}  Projet  : ${PROJECT_DIR}${NC}"
echo -e "${GRAY}  Tâche   : ${TASK_FILE}${NC}"
echo -e "${GRAY}  Résultat: ${RESULT_FILE}${NC}"
echo -e "${GRAY}  Status  : ${STATUS_FILE}${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}[${AGENT_NAME}]${NC} En attente de tâches..."

# Boucle principale
while true; do
    CURRENT_STATUS=$(cat "${STATUS_FILE}" 2>/dev/null || echo "idle")

    if [ "${CURRENT_STATUS}" = "pending" ]; then
        # Nouvelle tâche détectée
        echo -e "\n${YELLOW}[${AGENT_NAME}]${NC} 🔧 Tâche reçue, lancement de Claude..."
        echo "working" > "${STATUS_FILE}"

        # Lire le contenu de la tâche
        TASK_CONTENT=$(cat "${TASK_FILE}" 2>/dev/null || echo "Erreur: fichier tâche introuvable")

        # Construire le prompt avec contexte
        FULL_PROMPT="Tu es l'agent '${AGENT_NAME}' dans une équipe multi-agents.
Travaille dans le projet : ${PROJECT_DIR}
Branche courante : $(cd "${PROJECT_DIR}" && git branch --show-current 2>/dev/null || echo 'inconnue')

IMPORTANT:
- Commite tes changements avec le format type(scope): description
- Respecte les règles dans .claude/rules/
- Ne touche PAS aux fichiers hors de ton scope
- Quand tu as terminé, affiche un résumé de ce que tu as fait

--- TÂCHE ---
${TASK_CONTENT}"

        # Lancer Claude et capturer le résultat
        echo -e "${BLUE}[${AGENT_NAME}]${NC} Claude en cours d'exécution..."
        if claude --dangerously-skip-permissions \
            -p "${FULL_PROMPT}" \
            --output-format text \
            > "${RESULT_FILE}" 2>&1; then
            echo "done" > "${STATUS_FILE}"
            echo -e "${GREEN}[${AGENT_NAME}]${NC} ✅ Tâche terminée avec succès"
        else
            echo "error" > "${STATUS_FILE}"
            echo -e "${RED}[${AGENT_NAME}]${NC} ❌ Erreur lors de l'exécution"
        fi

        # Afficher un résumé du résultat
        RESULT_LINES=$(wc -l < "${RESULT_FILE}" 2>/dev/null || echo "0")
        echo -e "${GRAY}[${AGENT_NAME}]${NC} Résultat: ${RESULT_LINES} lignes → ${RESULT_FILE}"
        echo -e "${BLUE}[${AGENT_NAME}]${NC} En attente de la prochaine tâche..."
        HEARTBEAT_COUNT=0

    else
        # Heartbeat discret
        HEARTBEAT_COUNT=$((HEARTBEAT_COUNT + POLL_INTERVAL))
        if [ "${HEARTBEAT_COUNT}" -ge "${HEARTBEAT_INTERVAL}" ]; then
            echo -e "${GRAY}[${AGENT_NAME}]${NC} ⏳ idle — $(date +%H:%M:%S)"
            HEARTBEAT_COUNT=0
        fi
    fi

    sleep "${POLL_INTERVAL}"
done

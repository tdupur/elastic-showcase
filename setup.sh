#!/usr/bin/env bash
# =============================================================================
# Elastic Showcases — Team Setup Script
# Installs the /showcase Claude Code skill so you can generate new showcase
# presentation apps from any Elastic doc URL or blog post.
# =============================================================================

set -e

SKILL_NAME="showcase"
SKILL_SOURCE="$(cd "$(dirname "$0")/showcase-skill" && pwd)"
AGENTS_DIR="$HOME/.agents/skills/$SKILL_NAME"
CLAUDE_LINK="$HOME/.claude/skills/$SKILL_NAME"

# ── Colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
TEAL='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

print_header() {
  echo ""
  echo -e "${TEAL}${BOLD}╔══════════════════════════════════════════════════╗${RESET}"
  echo -e "${TEAL}${BOLD}║       Elastic Showcases — Skill Installer        ║${RESET}"
  echo -e "${TEAL}${BOLD}╚══════════════════════════════════════════════════╝${RESET}"
  echo ""
}

print_step() {
  echo -e "${TEAL}▶${RESET} $1"
}

print_ok() {
  echo -e "  ${GREEN}✓${RESET} $1"
}

print_warn() {
  echo -e "  ${YELLOW}⚠${RESET}  $1"
}

print_error() {
  echo -e "  ${RED}✗${RESET} $1"
}

# ── Preflight checks ─────────────────────────────────────────────────────────
print_header

print_step "Checking prerequisites..."

# Claude Code
if ! command -v claude &>/dev/null; then
  print_error "Claude Code CLI not found."
  echo "    Install it from: https://claude.ai/code"
  exit 1
fi
print_ok "Claude Code found ($(claude --version 2>/dev/null || echo 'installed'))"

# Node.js
if ! command -v node &>/dev/null; then
  print_warn "Node.js not found — you'll need it to run showcases locally."
  echo "    Install via: brew install node"
else
  print_ok "Node.js $(node --version)"
fi

# npm
if ! command -v npm &>/dev/null; then
  print_warn "npm not found."
else
  print_ok "npm $(npm --version)"
fi

# ── Install skill ─────────────────────────────────────────────────────────────
echo ""
print_step "Installing /showcase skill..."

# Create ~/.agents/skills/showcase/
if [ -d "$AGENTS_DIR" ]; then
  print_warn "Existing skill found at $AGENTS_DIR — updating..."
  cp "$SKILL_SOURCE/SKILL.md" "$AGENTS_DIR/SKILL.md"
  print_ok "Skill updated"
else
  mkdir -p "$AGENTS_DIR"
  cp "$SKILL_SOURCE/SKILL.md" "$AGENTS_DIR/SKILL.md"
  print_ok "Skill installed to $AGENTS_DIR"
fi

# Create ~/.claude/skills/ if needed
mkdir -p "$HOME/.claude/skills"

# Create symlink
if [ -L "$CLAUDE_LINK" ]; then
  print_warn "Symlink already exists — refreshing..."
  rm "$CLAUDE_LINK"
fi

ln -s "../../.agents/skills/$SKILL_NAME" "$CLAUDE_LINK"
print_ok "Symlink created at $CLAUDE_LINK"

# ── Verify ────────────────────────────────────────────────────────────────────
echo ""
print_step "Verifying installation..."

if [ -f "$AGENTS_DIR/SKILL.md" ] && [ -L "$CLAUDE_LINK" ]; then
  print_ok "Skill registered successfully"
else
  print_error "Something went wrong. Check $AGENTS_DIR and $CLAUDE_LINK"
  exit 1
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}══════════════════════════════════════════════════${RESET}"
echo -e "${GREEN}${BOLD}  Setup complete!${RESET}"
echo -e "${GREEN}${BOLD}══════════════════════════════════════════════════${RESET}"
echo ""
echo -e "  The ${BOLD}/showcase${RESET} skill is now available in Claude Code."
echo ""
echo -e "  ${BOLD}How to use it:${RESET}"
echo -e "  Start a new Claude Code session and type:"
echo ""
echo -e "  ${TEAL}/showcase --objective \"Feature Name\" \\${RESET}"
echo -e "  ${TEAL}          --url \"https://www.elastic.co/docs/...\" \\${RESET}"
echo -e "  ${TEAL}          --name \"feature-name\"${RESET}"
echo ""
echo -e "  ${BOLD}What it does:${RESET}"
echo -e "  Fetches the doc URL, generates all scene files, builds the app,"
echo -e "  and pushes to GitHub for automatic Vercel deployment."
echo ""
echo -e "  ${BOLD}Reference showcase (live):${RESET}"
echo -e "  https://elastic-autoops-showcase.vercel.app/"
echo ""

#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

required_files=(
  "README.md"
  "CHANGELOG.md"
  "docs/runbook-local.md"
  "docs/risks.md"
  "docs/publication-checklist.md"
  "diagrams/request-response.md"
  "diagrams/git-flow.md"
  "src/index.html"
  "src/sobre.html"
  "src/contato.html"
  "src/styles.css"
  "src/app.js"
  "src/data/equipe.json"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$ROOT_DIR/$file" ]]; then
    echo "ERRO: arquivo ausente: $file"
    exit 1
  fi
done

grep -q "IntraStack Básico" "$ROOT_DIR/README.md"
grep -q "fetch(\"data/equipe.json\")" "$ROOT_DIR/src/app.js"
grep -qi "envio simulado" "$ROOT_DIR/src/contato.html"
grep -q "Estudo / Fundamentos" "$ROOT_DIR/CHANGELOG.md"

echo "Smoke check OK: estrutura e textos principais encontrados."

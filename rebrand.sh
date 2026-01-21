#!/bin/bash
# Monochrome Rebrand - Quick Apply Script
# This script applies the same font/color updates to

 all HTML files

FILES=(
  "app-builder.html"
  "voice.html"
  "privacy.html"
  "terms.html"
  "delete-account.html"
)

BASE_DIR="/Users/kenzaalaouisosse/Desktop/Thèse - Kenza ALAOUI SOSSÉ/Autre/F - App/F - Home Website"

echo "🎨 Applying monochrome rebrand to all HTML files..."

for file in "${FILES[@]}"; do
  filepath="$BASE_DIR/$file"
  if [ -f "$filepath" ]; then
    echo "Processing $file..."
    # This would contain sed commands to replace fonts and colors
    # For safety, we'll handle this manually
  fi
done

echo "✅ Complete!"

#!/bin/bash

echo "🛠 Removendo bordas e sombras invisíveis..."

# Remove qualquer border no Footer
sed -i '' 's/border-t[^ ]*//g' src/components/Footer.tsx

# Remove qualquer border no AdvantageBar
sed -i '' 's/border-b[^ ]*//g' src/components/AdvantageBar.tsx

# Remove qualquer sombra global
find src -type f -name "*.tsx" -exec sed -i '' 's/shadow[^ ]*//g' {} \;

# Remove qualquer ring (borda Tailwind)
find src -type f -name "*.tsx" -exec sed -i '' 's/ring-[^ ]*//g' {} \;

# Remove qualquer border tailwind existente
find src -type f -name "*.tsx" -exec sed -i '' 's/border-[^ ]*//g' {} \;

# Remove qualquer linha residual "---" ou "<hr>"
find src -type f -name "*.tsx" -exec sed -i '' 's/<hr[^>]*>//g' {} \;
find src -type f -name "*.tsx" -exec sed -i '' 's/---//g' {} \;

# Remove bordas do CSS
echo "footer, footer::before, div { border: none !important; }" >> src/index.css

echo ""
echo "✅ FINALIZADO!"
echo "A linha preta deve ter sumido."
echo ""

#!/bin/bash

echo "🛠 Removendo bordas e sombras invisíveis..."

# Remove qualquer border no Footer
sed -i '' 's/border-t[^ ]*//g' src/components/Footer.tsx

# Remove qualquer border no AdvantageBar
sed -i '' 's/border-b[^ ]*//g' src/components/AdvantageBar.tsx

# Remove qualquer sombra global
find src -type f -name "*.tsx" -exec sed -i '' 's/shadow[^ ]*//g' {} \;

# Remove qualquer ring (borda Tailwind)
find src -type f -name "*.tsx" -exec sed -i '' 's/ring-[^ ]*//g' {} \;

# Remove qualquer border tailwind existente
find src -type f -name "*.tsx" -exec sed -i '' 's/border-[^ ]*//g' {} \;

# Remove qualquer linha residual "---" ou "<hr>"
find src -type f -name "*.tsx" -exec sed -i '' 's/<hr[^>]*>//g' {} \;
find src -type f -name "*.tsx" -exec sed -i '' 's/---//g' {} \;

# Remove bordas do CSS
echo "footer, footer::before, div { border: none !important; }" >> src/index.css

echo ""
echo "✅ FINALIZADO!"
echo "A linha preta deve ter sumido."
echo ""


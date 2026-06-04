#!/bin/bash
# ==========================================================================
# LingoQuest AI - Script de Deploy Automatizado (Produção)
# Alvo: Ubuntu / Debian VM
# ==========================================================================

# Cores para saída
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Sem cor

echo -e "${BLUE}===================================================${NC}"
echo -e "${BLUE}🚀 Iniciando Deploy de Altíssimo Nível: LingoQuest AI${NC}"
echo -e "${BLUE}===================================================${NC}"

# 1. Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js não detectado. Instalando Node.js LTS...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo -e "${GREEN}✓ Node.js detectado: $(node -v)${NC}"
fi

# 2. Instalar dependências locais do projeto
echo -e "${YELLOW}Instalando dependências npm do LingoQuest AI...${NC}"
npm install --production

# 3. Instalar o PM2 globalmente (Gerenciador de Processo de Produção)
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Instalando PM2 globalmente...${NC}"
    sudo npm install -g pm2
else
    echo -e "${GREEN}✓ PM2 detectado: $(pm2 -v)${NC}"
fi

# 4. Configurar arquivo .env se não existir
if [ ! -f .env ]; then
    echo -e "${YELLOW}Arquivo .env não encontrado. Criando a partir de .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}⚠️ ATENÇÃO: Edite o arquivo .env e configure sua GEMINI_API_KEY para a IA funcionar!${NC}"
fi

# 5. Iniciar o app no PM2 (para rodar em background e auto-reiniciar se cair)
echo -e "${YELLOW}Iniciando aplicação com PM2...${NC}"
pm2 delete lingoquest &> /dev/null || true
pm2 start server.js --name "lingoquest"

# Configurar PM2 para iniciar junto com a máquina (boot)
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
pm2 save

echo -e "${BLUE}---------------------------------------------------${NC}"
echo -e "${GREEN}✓ Backend do LingoQuest AI rodando com resiliência no PM2!${NC}"
echo -e "${BLUE}---------------------------------------------------${NC}"

# 6. Dica sobre o Caddy Server (Reverse Proxy + SSL Automático)
echo -e "${YELLOW}DICA DE INFRAESTRUTURA (HTTPS):${NC}"
echo -e "Para liberar o microfone do celular do seu filho, o Caddy Server é a melhor opção."
echo -e "Caso queira instalar o Caddy na VM para HTTPS automático, execute:"
echo -e "  sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https"
echo -e "  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg"
echo -e "  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list"
echo -e "  sudo apt update && sudo apt install caddy -y"
echo -e ""
echo -e "E configure seu Caddyfile (/etc/caddy/Caddyfile) apontando para localhost:8000:"
echo -e "${GREEN}lingoquest.seudominio.com {${NC}"
echo -e "${GREEN}    reverse_proxy localhost:8000${NC}"
echo -e "${GREEN}}${NC}"
echo -e "${BLUE}===================================================${NC}"

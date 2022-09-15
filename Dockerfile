FROM node:14.15.4-slim

USER node

WORKDIR /home/node/app

# Comando tail -f /dev/null para segurar o container rodando
CMD ["sh", "-c", "npm install && tail -f /dev/null"]


#!/usr/bin/env bash
INSTALL_DIR="/opt/what-tools/app"

function installAndStartApp() {
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    nvm use 6.9.4
    npm config set ignore-scripts false
    npm install pm2

    echo -e "Installing WebApp..."
    mkdir -p ${INSTALL_DIR}/ui
    cd ../app
    npm i gulp
    npm install
    npm run install

    npm run build
    cp -r server ${INSTALL_DIR}
    cp -r ui/dist ${INSTALL_DIR}/ui
    cd ${INSTALL_DIR}/server
    pm2 start ecosystem.config.js
}

installAndStartApp
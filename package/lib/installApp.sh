#!/usr/bin/env bash
INSTALL_DIR="/opt/what-tools/app"

function installApp() {
    source ${HOME}/.bashrc
    nvm use 6.9.4

    echo -e "Installing WebApp..."
    mkdir -p ${INSTALL_DIR}/ui

    cd ../app
    npm install
    npm run install

    npm run build
    cp -r server ${INSTALL_DIR}
    cp -r ui/dist ${INSTALL_DIR}/ui

}

installApp
#!/usr/bin/env bash
INSTALL_DIR="/opt/what-tools/app"

function installApp() {
    source ${HOME}/.bashrc
    nvm use 6.9.4

    echo -e "Installing WebApp..."
    mkdir -p ${INSTALL_DIR}/ui

    echo -e "Copying to tmp"
    cp -rf ../app /tmp
    cd /tmp/app

    npm install
    npm run install

    npm run build
    cp -rf server ${INSTALL_DIR}
    cp -rf package.json ${INSTALL_DIR}
    cp -rf ui/dist ${INSTALL_DIR}/ui
}

function beforeInstall() {
    rm -rf ${INSTALL_DIR}/*
}

function cleanUp() {
    rm -rf /tmp/app
}

beforeInstall
installApp
cleanUp
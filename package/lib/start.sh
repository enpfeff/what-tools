#!/usr/bin/env bash
INSTALL_DIR="/opt/what-tools/app"

function startAll() {
    echo "starting..."
    startWebApp
}

function startWebApp() {
    echo -e "WebApp"
    source ${HOME}/.bashrc
    nvm use 6.9.4
    cd ${INSTALL_DIR}/server
    npm run start
}
# =============================
#   Main
# =============================
startAll
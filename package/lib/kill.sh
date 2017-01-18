#!/usr/bin/env bash

function killWebApp() {
    echo -e "WebApp"
    source ${HOME}/.bashrc
    nvm use 6.9.4
    if [ -d /opt/what-tools/app/server ]; then
        cd /opt/what-tools/app/server
        npm run kill
    fi
}

function killAll() {
    echo -e "Killing..."
    killWebApp
}
# =============================
#   Main
# =============================
killAll
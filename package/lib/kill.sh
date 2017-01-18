#!/usr/bin/env bash

function killWebApp() {
    echo -e "WebApp"
    source ${HOME}/.bashrc

    if [ -d /opt/what-tools/app/server ]; then
        echo -e "Found Webapp folder need to stop it..."
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
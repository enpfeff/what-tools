#!/usr/bin/env bash

function kill() {
    program=$1

    systemctl status ${program}
    result=$?

    if [ result -eq 0 ]; then
        systemctl stop ${program}
    fi

}
function killAll() {
    echo -e "Killing..."
    sudo -u media killWebApp
}

function killWebApp() {
    echo -e "WebApp"
    source ${HOME}/.bashrc
    nvm use 6.9.4
    if [ -d /opt/what-tools/app/server ]; then
        cd /opt/what-tools/app/server
        npm run kill
    fi
}
# =============================
#   Main
# =============================
killAll
#!/usr/bin/env bash
INSTALL_DIR="/opt/what-tools/app"

function start() {
    program=$1

    systemctl status ${program}
    result=$?

    if [ result -eq 0 ]; then
        systemctl start ${program}
    fi

}
function startAll() {
    echo "starting..."
    startWebApp
}

function startWebApp() {
    echo -e "WebApp"
    cd ${INSTALL_DIR}/server
    pm2 start ecosystem.config.js
}
# =============================
#   Main
# =============================
startAll
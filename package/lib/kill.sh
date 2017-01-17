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
    if [ -d /opt/what-tools/app/server ]; then
        cd /opt/what-tools/app/server
        pm2 delete ecosystem.config.js
    fi

}

# =============================
#   Main
# =============================
killAll
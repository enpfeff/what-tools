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
        command -v pm2 >/dev/null 2>&1 && pm2 delete ecosystem.config.js || echo >&2 "I require foo but it's not installed.  Aborting.";
    fi

}

# =============================
#   Main
# =============================
killAll
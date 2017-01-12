#!/usr/bin/env bash

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
}

# =============================
#   Main
# =============================
startAll
#!/usr/bin/env bash

function kill() {
    program=$1

    systemctl status ${program}
    result=$?

    if [ result -eq 0 ]; then
        systemctl stop ${program}
    fi

}
fucntion killAll() {
    kill rtorrent
}

# =============================
#   Main
# =============================
killAll
#!/usr/bin/env bash

set -e

function canWeRun() {
    if [ "$(id -u)" != "0" ]; then
       echo "This script must be run as root" 1>&2
       exit 1
    fi
}

canWeRun

# creates users and groups
./lib/identity.sh

# kills are services that are involved with the install (e.g.) rtorrent
./lib/kill.sh

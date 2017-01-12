#!/usr/bin/env bash

function canWeRun() {
    if [ "$(id -u)" != "0" ]; then
       echo "This script must be run as root" 1>&2
       exit 1
    fi
}

canWeRun

rm -rf /opt/what-tools
cd ../app

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 6.9.4
npm run clean
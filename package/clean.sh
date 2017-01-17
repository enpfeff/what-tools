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

su media <<'EOF'
source ~/.bashrc
npm run clean
EOF
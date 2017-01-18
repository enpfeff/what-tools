#!/usr/bin/env bash

set -e

function canWeRun() {
    if [ "$(id -u)" != "0" ]; then
       echo "This script must be run as root" 1>&2
       exit 1
    fi
}

function flags() {
    # check out the flags
    while getopts ":b" opt; do
        case $opt in
            b)
                echo -e "Installing Base..."
                ./lib/identity.sh
                ./lib/installDirs.sh
                sudo -u media ./lib/installBase.sh
                ;;
        esac
    done
}

# ================================================================
#   MAIN
# ================================================================

# need to be root
canWeRun

# install things on the flags
flags

# kills are services that are involved with the install
sudo -u media ./lib/kill.sh

# install/upgrades what-tools app
sudo -u media ./lib/installApp.sh

# start it back up
sudo -u media ./lib/start.sh

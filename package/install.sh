#!/usr/bin/env bash

set -e

function canWeRun() {
    if [ "$(id -u)" != "0" ]; then
       echo "This script must be run as root" 1>&2
       exit 1
    fi
}

canWeRun

# kills are services that are involved with the install (e.g.) rtorrent
./lib/kill.sh

# check out the flags
while getopts ":b" opt; do
    case $opt in
        b)
            echo -e "Installing Base..."
            ./lib/identity.sh
            ./lib/installDirs.sh
            sudo -u media ./lib/installBase.sh
            exit 0;
            ;;
    esac
done

# install what-tools app
sudo -u media ./lib/installApp.sh

# end of install bring everything up
./lib/start.sh
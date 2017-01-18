#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

install_dir=/opt/what-tools/tools

rm -rf ${install_dir}

rm -f /usr/bin/process-torrent
rm -f /usr/bin/plex-updater
rm -f /usr/bin/uninstall-what-tools
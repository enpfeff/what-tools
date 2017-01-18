#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

install_dir=/opt/what-tools
bin=${install_dir}/bin

mkdir -p ${install_dir}
cp -rf config lib entries bin package.json ${install_dir}
chmod -R 775 ${install_dir}
chown -R enpfeff:data ${install_dir}
cd ${install_dir}
npm install
chmod -R 775 ${install_dir}/node_modules

cp -f ${bin}/plex-updater.sh /usr/bin/plex-updater && chmod 775 /usr/bin/plex-updater
cp -f ${bin}/process-torrent.sh /usr/bin/process-torrent && chmod 775 /usr/bin/process-torrent
cp -f ${bin}/uninstall-what-tools.sh /usr/bin/uninstall-what-tools && chmod 775 /usr/bin/uninstall-what-tools

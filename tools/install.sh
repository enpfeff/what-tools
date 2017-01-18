#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

install_dir=/opt/what-tools/tools
bin=${install_dir}/bin
cwd=`pwd`

# clean any existing version of this
rm -rf $install_dir

cd ../tools

mkdir -p ${install_dir}
cp -rf config lib entries bin package.json ${install_dir}
chmod -R 775 ${install_dir}
chown -R media:data ${install_dir}
cd ${install_dir}

su media <<'EOF'
source $HOME/.bashrc
npm i
EOF

chmod -R 775 ${install_dir}/node_modules

cp -f ${bin}/plex-updater.sh /usr/bin/plex-updater && chmod 775 /usr/bin/plex-updater
cp -f ${bin}/process-torrent.sh /usr/bin/process-torrent && chmod 775 /usr/bin/process-torrent
cp -f ${bin}/uninstall-what-tools.sh /usr/bin/uninstall-what-tools && chmod 775 /usr/bin/uninstall-what-tools
cd $cwd

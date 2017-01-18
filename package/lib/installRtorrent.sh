#!/usr/bin/env bash

rtorrent_home="/opt/rtorrent"
data_home="/data"

mkdir -p ${rtorrent_home}/{watch,log,script}
mkdir -p $rtorrent_home/watch/{misc,tv,movie}
cp ./bin/processDownloadComplete.sh $rtorrent_home/script/processDownloadComplete.sh

chown media:data -R $rtorrent_home
chmod 775 -R $rtorrent_home
chmod +x $rtorrent_home/script/processDownloadComplete.sh

mkdir -p $data_home/{stagedTv,misc,tv,movie}
chown media:data -R $data_home
chmod 775 -R $data_home

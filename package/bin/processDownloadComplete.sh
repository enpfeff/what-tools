#!/bin/bash

export LOGGLY_KEY=e5d95625-a570-434a-a707-13b29acb6730
export PROWL_API_KEY=09152be5ee79d2b3b48744635dd8757650c05566
sleep 5

src=$1
target=$2
LOG=/opt/rtorrent/log/moveLog.txt
baseDir=`basename ${target}`
filename=$(basename ${src})

echo "`date`: Moving - Source:${src} --> Target:${target}" >> $LOG
echo "basedir = ${baseDir}, filename = ${filename}" >> $LOG
echo "cmd = process-tv ${target}/${filename}" >> $LOG

mv -u "${src}" "${target}"

if [ "${baseDir}" == "stagedTv" ]; then
	echo "Processing TV" >> $LOG
	process-torrent "${target}/${filename}" &> $LOG
elif [ "${baseDir}" == "movie" ]; then
	echo "Processing Movie" >> $LOG
	process-torrent "${target}/${filename}" -m &> $LOG
fi

echo " " >> $LOG
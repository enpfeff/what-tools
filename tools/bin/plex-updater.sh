#!/usr/bin/env bash

install_dir=/opt/what-tools/tools
entry=${install_dir}/entries

if [ $# -eq 1 ]; then
    type=$1
    node ${entry}/start-plexUpdater.js ${type}
else
    echo "Wrong number of arguments"
fi


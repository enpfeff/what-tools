#!/usr/bin/env bash

install_dir=/opt/what-tools/tools
entry=${install_dir}/entries

if [ $# -ge 1 ]; then
    input="$@"
    source ${HOME}/.bashrc
    node ${entry}/start-process.js ${input}
else
    echo "No arguments supplied"
fi
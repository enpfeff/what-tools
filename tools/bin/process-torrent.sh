#!/usr/bin/env bash

install_dir=/opt/what-tools
entry=${install_dir}/entries

if [ $# -ge 1 ]; then
    input="$@"
    node ${entry}/start-process.js ${input}
else
    echo "No arguments supplied"
fi

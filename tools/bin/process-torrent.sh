#!/usr/bin/env bash

install_dir=/opt/what-tools
entry=${install_dir}/entries

if [ $# -ge 1 ]; then
    input="$@"
su media <<'EOF'
source ${HOME}/.bashrc
node ${entry}/start-process.js ${input}
EOF
else
    echo "No arguments supplied"
fi
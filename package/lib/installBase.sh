#!/usr/bin/env bash

function installBase() {
    echo -e "Installing dependencies..."
    command -v git >/dev/null 2>&1 && echo -e "Git Installed..." || installGit
    command -v nvm > /dev/null 2>&1 && echo -e "Nvm Installed..." || installNvm
    node -v | grep -i "v6.9.4" &> /dev/null && echo -e "Node Installed..." || installNode

}

function installNvm() {
    echo -e "installing NVM..."
    apt-get install -y build-essential libssl-dev
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    command -v nvm || "Error installing nvm...";
}

function installGit() {
    echo -e "install GIT..."
}


function installNode() {
    echo -e "Installing Node via NVM"
    nvm install 6.9.4
    nvm use 6.9.4
}

# creates users and groups
./lib/identity.sh
installBase

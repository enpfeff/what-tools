#!/usr/bin/env bash

WHAT_TOOLS_ADMIN="media"
WHAT_TOOLS_GROUP="data"
DEFAULT_PASS="Passwd12!"

function createGroup() {
    group=$1
    echo -e "Creating group ${group}\n"
    getent group ${group} || groupadd ${group}
}

function createUser() {
    user=$1
    group=$3
    pass=$2

    getent passwd $1 > /dev/null 2&>1
    result=$?;

    if [ $result -ne 0 ]; then
        echo -e "Creating user ${user}\n"
        useradd -p ${pass} -m ${user} -G ${group}

        # make sure we are in the bash shell
        usermod -s /bin/bash ${user}
    fi
}

# =============================
#   Main
# =============================
createGroup ${WHAT_TOOLS_GROUP}
createUser ${WHAT_TOOLS_ADMIN} ${DEFAULT_PASS} ${WHAT_TOOLS_GROUP}
echo -e "Identity created\n"
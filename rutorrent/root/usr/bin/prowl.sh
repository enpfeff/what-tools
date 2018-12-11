#! /bin/bash

###########
# API endpoint
#
PROWL_API_ENDPOINT="https://api.prowlapp.com/publicapi/add"
API_CLIENT_VERSION="0.1.0"
USER_AGENT="enpfeff/${API_CLIENT_VERSION}"
###

###########
# Define default attributes
#
PROWL_API_KEY=""
APPLICATION="`hostname`"
PRIORITY="1"
EVENT=""
DESCRIPTION=""
URL=""
VERBOSE=0

###########
# check if curl is installed
#
type curl >/dev/null 2>&1 || { echo; echo "PROWL CLIENT:"; echo "Required dependency \"curl\" is missing. Aborting."; echo; exit 0; }

###########
# Parse response information and set
# the the exit state
#
function parseResponse {
    if [[ "${VERBOSE}" -eq "1" ]]; then
        echo "$1"
    fi

    if [[ "$STATUS_CODE" -gt 200 ]]; then
        exit $STATUS_CODE
    fi
    exit 0
}

###########
# Displays help text
#
function usage {
    echo "Usage:"
    echo "  $0 [-a <application name>] [-k <api key>] [-p <priority>] -e <event> -d <description> [-u <url>]"
    echo "Option -a Application name that generates this event, default is set to \"${APPLICATION}\"."
    echo "Option -k API-Key to overwrite the default defined key."
    echo "Option -p Priority default is set to \"${PRIORITY}\"."
    echo "               -2: Very Low"
    echo "               -1: Moderate"
    echo "                0: Normal"
    echo "               +1: High"
    echo "               +2: Emergency"
    echo "Option -e Event or subject of the notification. (Required)"
    echo "Option -d Description of the event. (Required)"
    echo "Option -u The URL which should be attached to the notification."
    echo "Option -h Displays help text."
    echo "Option -v Displays response status."
    echo ""
    exit $1
}

###########
# Get argument values
#
while getopts 'a:k:p:e:d:u:hv' OPTION ; do
    case "${OPTION}" in
        a)  APPLICATION="${OPTARG}";;
        k)  PROWL_API_KEY="${OPTARG}";;
        p)  PRIORITY="${OPTARG}";;
        e)  EVENT="${OPTARG}";;
        d)  DESCRIPTION="${OPTARG}";;
        u)  URL="${OPTARG}";;
        h)  echo; usage 1;;
        v)  VERBOSE=1;;
        \?) echo; usage 1;;
    esac
done


if [ -z "${EVENT}" ]; then
    echo "$0: missing required option -- e"
    echo
    usage 1
fi

if [ -z "${DESCRIPTION}" ]; then
    echo "$0: missing required option -- d"
    echo
    usage 1
fi

# process api request
RESPONSE=$(curl -s ${PROWL_API_ENDPOINT} \
     --insecure \
     -A ${USER_AGENT} \
     -F apikey="${PROWL_API_KEY}" \
     -F application="${APPLICATION}" \
     -F priority="${PRIORITY}" \
     -F event="${EVENT}" \
     -F description="${DESCRIPTION}" \
     -F url="${URL}")
parseResponse "${RESPONSE}"

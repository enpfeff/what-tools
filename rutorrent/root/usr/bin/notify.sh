#!/usr/bin/env bash
name=$1

/usr/bin/prowl.sh -e "Download Complete" -d "${name}"

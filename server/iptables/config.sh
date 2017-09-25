#!/usr/bin/env bash

sudo iptables -I INPUT -s 127.0.0.1 -j ACCEPT

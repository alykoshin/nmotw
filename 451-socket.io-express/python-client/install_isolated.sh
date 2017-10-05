#!/usr/bin/env bash

VIRTUAL_ENV=$HOME/.virtualenv

# Prepare isolated environment
virtualenv $VIRTUAL_ENV

# Activate isolated environment
source $VIRTUAL_ENV/bin/activate

# Install package
pip install -U socketIO-client

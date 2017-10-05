#!/usr/bin/env bash

VIRTUAL_ENV=$HOME/.virtualenv
source $VIRTUAL_ENV/bin/activate
cd $(python -c "import os, socketIO_client;\
    print(os.path.dirname(socketIO_client.__file__))")

pwd
python ./client.py

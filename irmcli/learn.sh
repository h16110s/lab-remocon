#!/bin/sh

touch $HOME/workdir/irmcli/data/$1.json
python $HOME/workdir/irmcli/irmcli.py -s -f $HOME/workdir/irmcli/data/$1.json

#!/bin/bash

docker exec -i mymemo1-db \
psql -U user -d memo1_app < ./sql/init.sql
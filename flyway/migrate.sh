#!/bin/bash          

FLYWAY_URL=$(aws ssm get-parameter --query Parameter.Value --output text --name db_url)
FLYWAY_USER=admin
FLYWAY_ADMINPW=$(aws ssm get-parameter --query Parameter.Value --with-decryption --output text --name db_adminPw)
FLYWAY_DEFAULT_SCHEMA=$(aws ssm get-parameter --query Parameter.Value --output text --name db_name)

# MSYS thing is to disable path rewrite for winblows git bash
MSYS_NO_PATHCONV=1 docker run --rm \
    -v `pwd`/conf:/flyway/conf \
    -v `pwd`/migrations:/flyway/sql flyway/flyway:latest-alpine \
    -url="jdbc:mysql://$FLYWAY_URL" \
    -user="$FLYWAY_USER" \
    -password="$FLYWAY_ADMINPW" \
    -defaultSchema="$FLYWAY_DEFAULT_SCHEMA" \
    migrate

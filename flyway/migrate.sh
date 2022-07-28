#!/bin/bash          

FLYWAY_URL=$(aws ssm get-parameter --query Parameter.Value --output text --name db_url)
FLYWAY_USER=$(aws ssm get-parameter --query Parameter.Value --output text --name db_adminUsername)
FLYWAY_ADMINPW=$(aws ssm get-parameter --query Parameter.Value --with-decryption --output text --name db_adminPw)

# MSYS thing is to disable path rewrite for winblows git bash
MSYS_NO_PATHCONV=1 docker run --rm \
    -v `pwd`/conf:/flyway/conf \
    -v `pwd`/migrations:/flyway/sql flyway/flyway:latest-alpine \
    -url="jdbc:postgresql://$FLYWAY_URL/postgres" \
    -user="$FLYWAY_USER" \
    -password="$FLYWAY_ADMINPW" \
    migrate

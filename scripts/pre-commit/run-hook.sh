#!/usr/bin/env bash

echo "Running pre-commit hook"
./scripts/pre-commit/run-tests.sh

RED='\033[0;31m'
NC='\033[0m'

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo ""
 echo -e "${RED}[PRE-COMMIT ERROR] ${NC}FIX TESTS BEFORE COMMIT"
 echo ""
 exit 1
fi

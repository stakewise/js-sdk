#!/usr/bin/env bash

GIT_DIR=$(git rev-parse --git-dir)

echo "Installing hooks..."

ln -s ../../scripts/pre-commit/run-hook.sh $GIT_DIR/hooks/pre-commit
echo "Done"!

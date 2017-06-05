#!/usr/bin/env bash

git checkout deploy
(cd .. && git checkout master dist/ scripts/ package.json)

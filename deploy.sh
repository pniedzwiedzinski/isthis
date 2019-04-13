#!/bin/bash

set -x
set -euo pipefail

npm install

npm run deploy

#!/bin/bash
cd /home/kavia/workspace/code-generation/ekyc-41822-41866/WebFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


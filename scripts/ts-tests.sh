#!/bin/bash

echo -e "Going to TypeScript tests folder and linking the package.\n"
cd ts-tests ## Go to typescript tests folder
npm link @splitsoftware/splitio-api ## Link to the cloned code
echo -e "Installing dependencies for TypeScript declarations testing...\n"
#npm install ## Install dependencies
echo -e "Dependencies installed, running tsc compiler.\n"
tsc ## Run typescript compiler. No need for flags as we have a tsconfig.json file

if [ $? -eq 0 ]
then
  echo -e "Successfully compiled TS tests. About to unlink and go back to previous directory.\n"
  npm unlink @splitsoftware/splitio-api
  cd -
  exit 0
else
  echo -e "Error compiling TS tests. About to unlink and go back to previous directory.\n"
  npm unlink @splitsoftware/splitio-api
  cd -
  exit 1
fi
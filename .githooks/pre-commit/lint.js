#!/bin/sh

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".js\{0,1\}$")

if [[ "$STAGED_FILES" = "" ]]; then
exit 0
fi

PASS=true

echo "\nValidating Javascript:\n"

# Check for eslint
  ESLINT=$(npm bin)/eslint
if [[ ! -x $ESLINT ]]; then
echo "\t\033[41mPlease install ESlint (run npm install)\033[0m"
exit 1
fi

$ESLINT --cache --quiet "$STAGED_FILES"

if [[ "$?" == 0 ]]; then
echo "\t\033[32mESLint Passed\033[0m"
else
echo "\t\033[41mESLint Failed\033[0m"
PASS=false
fi

echo "\nJavascript validation completed!\n"

if ! $PASS; then
echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
exit 1
else
echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi

exit $?
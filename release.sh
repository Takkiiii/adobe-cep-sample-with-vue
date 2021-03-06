#!/bin/sh
# config
VERSION=$(node --eval "console.log(require('./package.json').version);")
NAME=$(node --eval "console.log(require('./package.json').name);")

git push --follow-tags origin master

# checkout temp branch for release
git checkout -b gh-release

# force add files
git add packages -f

# commit changes with a versioned commit message
git commit -m "build $VERSION"

# push commit so it exists on GitHub when we run gh-release
git push origin gh-release

# create a ZIP archive of the dist files
zip -r $NAME-v$VERSION.zip packages

LOG=$(cat CHANGELOG.md)

# run gh-release to create the tag and push release to github
./node_modules/.bin/gh-release -n v$VERSION -c master --assets $NAME-v$VERSION.zip -b "$LOG" -y

# checkout master and delete release branch locally and on GitHub
git checkout master
git branch -D gh-release
git push origin :gh-release
#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const open = require('open');
const execa = require('execa');
const normalize = require('normalize-url');
const regexURL = require('url-regex');

// Check URL
function checkURL(str) {
  let url = normalize(str);
  if (url.match(regexURL())) {
     return true
  } else {
    return false
  }
}

// Execute the commandline
execa('git', ['config', '--get', 'remote.origin.url']).then(res => {
  if ( checkURL(res.stdout) ) {
    open(res.stdout)
  } else {
    console.log();
    console.log('The url below is not a valid url...');
    console.log(res.stdout);
    console.log();
  }
})

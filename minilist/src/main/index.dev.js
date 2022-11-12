/*
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
import installExtension from 'electron-devtools-installer'
// Or if you can not use ES6 imports
const { app } = require('electron')

app.on('ready', () => {
   installExtension('nhdogjmejiglipccpnnnanhbledajbpd')
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
   //Install devtron devtools
   require('devtron').install()
})

// Require `main` process to boot app
require('./index')

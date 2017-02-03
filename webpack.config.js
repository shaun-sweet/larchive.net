var webpack = require('webpack');
var path = require('path');

var entry = path.resolve(__dirname, 'src/js/submit-link.js');
var output = path.resolve(__dirname, 'public/js');

var config = {
  entry: entry,
  output: {
    path: output,
    filename: 'submit-link.bundle.js'
  },
  module : {
   loaders : [
     {
       test : /\.js?/,
       include : entry,
       loader : 'babel-loader'
     }
   ]
 }
};

module.exports = config;

const express = require('express')
const app = express()
const port = 3000

var pug = require('pug');

// compile
var fn = pug.compile('string of pug', options);
var html = fn(locals);

// render
var html = pug.render('string of pug', merge(options, locals));

// renderFile
var html = pug.renderFile('filename.pug', merge(options, locals));
var square = require('./square'); // Chamamos o arquivo utilizando o require()

console.log('The area of a square with a width of 4 is ' + square.area(4));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express');
const fs = require('fs');
const path = require('path');
const URLShortener = require('./urlShortener.js');

const dataPath = path.join(__dirname, 'data', 'urldata.json');
const urls = JSON.parse(fs.readFileSync(dataPath));
let urlData = [];
urls.forEach((url) => {
    urlData.push(new URLShortener.URLShortener(url.originalURL, url.shortURL, url.clickCount));
})


const app = express();
const publicPath = path.resolve(__dirname, 'public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    console.log(`Method: ${req.method}
Path: ${req.path}
Query: ${JSON.stringify(req.query)}`);
	next();
});

app.get('/', function(req, res){
    res.render('home.hbs');
})
app.get('/shorten', function(req, res){

})
app.get('/expand', function(req, res){
    
})

app.post('/shorten', function(req, res){

})










app.listen(3000, () => {
    console.log('Server started; type CTRL+C to shut down');
});
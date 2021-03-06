const express = require('express');
const fs = require('fs');
const path = require('path');
const URLShortener = require('./urlShortener.js');
const promise = fs.promises;

const app = express();

const dataPath = path.join(__dirname, 'data', 'urldata.json');

const readFileDum = promise.readFile;
let urlData = [];
readFileDum(dataPath).then(data => {
    const dataStr = data.toString();
    urlData = JSON.parse(dataStr);
    console.log(urlData);
    app.listen(3000, () => console.log("Server started; type CTRL+C to shut down")); 
});

let displayMessage = false;
// // const readFile = util.promisify(fs.readFile);
// // async function callReadFile(path){
// //     const readFiles = await readFile(path);
// // }
// const readFile = util.promisify(fs.readFile);
// async function doFile(path) {
//     try {
//         const text = await readFile(path, 'utf8');
//         return JSON.parse(text);
//     } catch (err) {
//         console.log('Error', err);
//     }
// }
// let urlData = [];
// let xxx = [];
// doFile(dataPath).then(urls => xxx = [...urls]);
// console.log(xxx);
// doFile(dataPath).then((urls) => {
//     urls.forEach((url) => {
//         urlData.push(new URLShortener.URLShortener(url.originalURL, url.shortURL, url.clickCount));
//     })
// });
// console.log(urlData);

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
    const urlDataDum = [...urlData];
    urlDataDum.sort((a, b) => (b.clickCount - a.clickCount));
    const trendings = urlDataDum.slice(0, 5);
    res.render('home', {trendings: trendings});
});
app.get('/shorten', function(req, res){
    res.render('shorten', {valid: displayMessage, shortenURL: urlData[urlData.length - 1].shortURL});
});
app.get('/expand', function(req, res){
    displayMessage = false;
    const inputURL = req.query.shortURL;
    const inputObj = new URLShortener.URLShortener();
    inputObj.shortURL = inputURL;
    const originalURL = inputObj.expand(urlData);
    console.log(originalURL);
    if(originalURL !== undefined){
        displayMessage = true;
    }
    res.render('expand', {valid: displayMessage, expandURL: originalURL});
    const writeData = JSON.stringify(urlData, null, 2);
    fs.writeFileSync(dataPath, writeData, (err) =>{
        if(err){throw err;}
    });
});

app.post('/shorten', function(req, res){
    console.log(req.body);
    const newURL = new URLShortener.URLShortener(req.body.originalURL);
    newURL.shorten(urlData);
    displayMessage = true;
    urlData.push(newURL);
    const writeData = JSON.stringify(urlData, null, 2);
    fs.writeFileSync(dataPath, writeData, (err) =>{
        if(err){throw err;}
    });
    console.log('JSON file updated');
    res.redirect('/shorten');
});

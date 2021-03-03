const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, 'public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.get('/', function(req, res){
    res.render('trending.hbs');
})










app.listen(3000);
console.log('Server started; type CTRL+C to shut down');
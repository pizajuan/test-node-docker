const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello world2');
});

app.listen(3000, '0.0.0.0', () => {
    console.log('im alive in port 3000')
});

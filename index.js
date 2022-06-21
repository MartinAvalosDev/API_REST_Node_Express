const express = require('express')
const app = express()
const rutasAll = require('./routes/rutas.js')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', rutasAll)


const port = 3001
app.listen(port, ()=>{
    console.log('listening on port ' + port);
})

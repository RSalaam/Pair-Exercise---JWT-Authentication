const express = require('express');
const app = express();
app.use(express.json());
const { models: { User }} = require('./db');
const path = require('path');
const jwt = require('jsonwebtoken')

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/auth', async(req, res, next)=> {
  try {
    res.send({ token: await User.authenticate(req.body)});
  }
  catch(ex){
      console.log(ex)
    next(ex);
  }
});

app.get('/api/auth', async(req, res, next)=> {
  try {
    res.send(await User.byToken(req.headers.authorization));
  }
  catch(ex){
    console.log(ex) 
    next(ex);
  }
});

app.use((err, req, res, next)=> {

  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
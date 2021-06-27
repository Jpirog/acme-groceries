const express = require('express');
const { static } = express;
const path = require('path');
const { syncAndSeed, Grocery } = require('./db.js');

const app = express();
app.use(express.json());

app.use('/dist', static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

const route = require('./routes');
app.use('/api/groceries', route);

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();

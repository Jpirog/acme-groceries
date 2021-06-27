const express = require('express');
const router = express.Router();
const { Grocery } = require('./db')

router.get('/:name', async(req, res, next)=> {
  try {
    res.send(await Grocery.findAll({
      where: {
        name: req.params.name
      }
    }));
  }
  catch(ex){
    next(ex);
  }
});

router.get('/', async(req, res, next)=> {
  try {
    res.send(await Grocery.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.put('/:id', async(req, res, next)=> {
  try {
    const grocery = await Grocery.findByPk(req.params.id);
    await grocery.update(req.body);
    res.send(grocery);
  }
  catch(ex){
    next(ex);
  }
});

router.delete('/:id', async(req, res, next)=> {
  try {
    console.log('AXIOS DELETE',req.params.id, req.params)
    const grocery = await Grocery.findByPk(req.params.id);
    await grocery.destroy();
    res.sendStatus(201);
  }
  catch(ex){
    next(ex);
  }
});

router.post('/', async(req, res, next)=> {
  try {
    res.send(await Grocery.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.post('/random', async(req, res, next)=> {
  try {
    res.send(await Grocery.createRandom());
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;
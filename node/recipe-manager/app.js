const express = require('express');
const parser = require('body-parser');
const path = require('path')
const app = express();
//const uuid = require('uuid');

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.set('view engine','ejs');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'password',
        database : 'recipe'
    },
    pool : {
        min: 2,
        max: 10
    }
});

var difficulties = ['Easy', 'Medium', 'Hard'];

app.get('/create',(req,res)=> {
    
    res.render('create', {difficulties});
});

app.post('/create', async (req,res)=> {

    const { name, description, ingredients, time_taken, difficulty } = req.body;
    // const id = uuid();
    await knex('recipes').insert({name, description, ingredients: ingredients.trim("\r\n").trim(","), time_taken, difficulty});
    res.redirect('/');
});

app.get('/edit/:id', async (req,res)=> {
    const recipe = await knex('recipes').where({id:req.params.id}).first();
    res.render('edit', {recipe, difficulties});
});

app.post('/edit/:id', async (req,res)=> {

    const { name, description, ingredients, time_taken, difficulty } = req.body;
    await knex('recipes').where({id: req.params.id}).update({name, description, ingredients: ingredients.trim("\r\n").trim(","), time_taken, difficulty});
    res.redirect('/');
});

app.delete('/recipe/:id', async (req,res)=> {

    const r = await knex('recipes').where({id: req.params.id}).delete();
    res.json({status: r});
});

app.get('/', async (req, res) => {
    
    const list = await knex('recipes').select([]);
    
    const ingredients = function(i) {
        return i.split(',')
    }
    res.render('index', {list, difficulties, ingredients})
})

app.listen('3000',function(){
    console.log('Server started on port on 3000');
})
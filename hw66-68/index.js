import express from 'express';
import mongoose from 'mongoose';
import { User } from './model/user.js';

const PORT = 3000;

const url = 'mongodb://localhost:27017/client';

const app = express();

app.use(express.static('css'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');

mongoose.connect(url)
        .then(()=> {
            console.log('Connected to DB');
            app.listen(PORT, ()=> {
                console.log(`Server started on http://localhost:${PORT}`);
            })
        })
        .catch((err)=> {console.log(`DB connection error: ${err}`)});

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', {users});
    } catch (err){
        console.log(err);
    }
});

app.post('/add', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.redirect('/');
    } catch(err){
        console.log(err);
    }
});

app.get('/edit/:id', async (req, res)=> {
    try{
        const user = await User.findById(req.params.id)
        res.render('edit', {user});
    } catch(err){
        console.log(err);
    }
});

app.post('/change-user/:id', async (req, res)=> {
    try{
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch(err){
        console.log(err);
    }
});

app.delete('/remove/:id', async (req, res)=> {
    try{
        await User.deleteOne({_id: req.params.id})
        res.status(200).json({ message: 'User deleted' });
    } catch(err){
        console.log(err);
    }
});

app.get('/login', (req, res) => {
    res.render('login')
});
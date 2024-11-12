import express from "express";

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/information', (req,res) => {
    res.render('information.ejs');
});

app.get('/contacts', (req,res) => {
    res.render('contacts.ejs');
});

app.get('/catalog', (req,res) => {
    res.render('card.ejs', {number: 1, type: 'одинарний', price: '50 000', length: '190', width: '200', height: '170'});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
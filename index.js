import express from "express";
import dotenv from 'dotenv';
import pkg from 'pg';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

const { Pool } = pkg; // Destructure `Pool` from the default import
// PostgreSQL pool configuration
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false, // Set to true in production with valid certificates
    },
});

async function getItemById(id) {
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return result.rows[0];
}

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/information', (req,res) => {
    res.render('information.ejs');
});

app.get('/contacts', (req,res) => {
    res.render('contacts.ejs');
});

app.get('/catalog', async(req,res) => {
    const getItems = `SELECT * FROM items`;
    const result = await pool.query(getItems);
    const data = result.rows;

    res.render('catalog.ejs', {data});
});

app.post('/detail', (req, res) => {
    const productId = req.body.checkID; // Get the product ID from the form
    res.redirect(`/detail/${productId}`); // Redirect to GET route with ID in the URL
});

// GET route to display the detail page
app.get('/detail/:id', async (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL
    const result = await getItemById(productId);

    res.render('card.ejs', {
        name: result.name,
        id: result.id,
        height: result.height,
        width: result.width,
        length: result.length,
        articul: result.articul,
        price: result.price,
        components: result.components,
        extra_costs: result.extra_costs,
        extra_cost_values: result.extra_cost_values,
        photos: result.photos
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
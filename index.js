import express from "express";
import dotenv from 'dotenv';
import pkg from 'pg';
import bodyParser from 'body-parser';
import mailjet from 'node-mailjet';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

const email = mailjet.apiConnect(process.env.API_KEY, process.env.SECRET_KEY);

const { Pool } = pkg; // Destructure `Pool` from the default import
// PostgreSQL pool configuration
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync('/etc/secrets/eu-north-1-bundle.pem').toString() 
    }
});

async function getItemById(id) {
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return result.rows[0];
}

const sendEmail = async (text) => {
    try {
      const result = await email.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: process.env.email,
              Name: 'Відповідь каталогу',
            },
            To: [
              {
                Email: process.env.email,
                Name: 'Отримання замовлення',
              },
            ],
            Subject: 'Нове замовлення!' ,
            HTMLPart: text,
          },
        ],
      });

    } catch (error) {
      console.error('Error sending email:', error.message);
    }
};

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/information', (req,res) => {
    res.render('information.ejs');
});

app.get('/contacts', (req,res) => {
    res.render('contacts.ejs');
});

app.get('/order', async(req,res) => {
    const chosenItem =  req.query.id;
    const getChosenItem = await getItemById(chosenItem);
    const {articul, price, components, extra_costs, extra_cost_values } = getChosenItem;
    res.render('form.ejs', {articul: articul, price: price, components: components, extra_costs: extra_costs, extra_cost_values: extra_cost_values });
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

app.post('/send', (req, res) => {
    const infoToSend = req.body; 
    const itemArticul = req.query.articul;
    const {phone, name, comment} = infoToSend;

    const element = `<h1>Вибраний виріб: ${itemArticul} </h1>
                    <h2> Номер замовника: ${phone}</h1> <br>
                    <h3><i> Ім'я замовника: </i> ${name} </h2> <br><br>
                    <h4><i> ${comment} </i></h3>
    `;
    sendEmail(element);

    res.redirect(`/?success=1`); 
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
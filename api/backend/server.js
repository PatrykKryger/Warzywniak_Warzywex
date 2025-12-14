const express = require('express');
require('dotenv').config({ path: './login_data.env' });
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/api');
const productsRoutes = require('./routes/products');
app.use(express.json());



app.use(cors({
    origin: "http://localhost:5173"
}));

app.get('/', (req, res) => {
    res.send('meowmeowmeow');
})


app.use('/api', apiRoutes);
app.use('/products', productsRoutes);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

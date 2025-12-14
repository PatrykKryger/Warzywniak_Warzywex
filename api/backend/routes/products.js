const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/info', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT product_id, category_id, name, price, unit, country_of_origin, stock, short_description, calories_per_100g, created_at, image_url 
             FROM products`
        );
        res.status(200).json({ rows });
    } catch (error) {
        console.error('Błąd pobierania produktów:', error.message);
        res.status(500).json({ status: 'Error', message: 'Nie można pobrać produktów', error: error.message });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { category_id, name, price, unit, country_of_origin, stock, short_description, calories_per_100g, image_url } = req.body;

        const [result] = await db.query(
            `INSERT INTO products 
            (category_id, name, price, unit, country_of_origin, stock, short_description, calories_per_100g, created_at, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
            [category_id, name, price, unit, country_of_origin, stock, short_description, calories_per_100g, image_url]
        );

        res.status(201).json({ status: 'OK', message: 'Produkt dodany', productId: result.insertId });
    } catch (error) {
        console.error('Błąd dodawania produktu:', error.message);
        res.status(500).json({ status: 'Error', message: 'Nie można dodać produktu', error: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, name, price, unit, country_of_origin, stock, short_description, calories_per_100g, image_url } = req.body;

        const [result] = await db.query(
            `UPDATE products 
             SET category_id = ?, name = ?, price = ?, unit = ?, country_of_origin = ?, stock = ?, short_description = ?, calories_per_100g = ?, image_url = ?
             WHERE product_id = ?`,
            [category_id, name, price, unit, country_of_origin, stock, short_description, calories_per_100g, image_url, id]
        );

        res.status(200).json({ status: 'OK', message: 'Produkt zaktualizowany', affectedRows: result.affectedRows });
    } catch (error) {
        console.error('Błąd aktualizacji produktu:', error.message);
        res.status(500).json({ status: 'Error', message: 'Nie można zaktualizować produktu', error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [id]);

        res.status(200).json({ status: 'OK', message: 'Produkt usunięty', affectedRows: result.affectedRows });
    } catch (error) {
        console.error('Błąd usuwania produktu:', error.message);
        res.status(500).json({ status: 'Error', message: 'Nie można usunąć produktu', error: error.message });
    }
});

module.exports = router;

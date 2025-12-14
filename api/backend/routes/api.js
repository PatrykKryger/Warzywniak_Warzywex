const express = require('express');
const router=express.Router();
const db=require('../config/db');

router.get('/ping',(req, res) => {
    res.status(200).json({status:"ok", message:"połączono z API"});
});

router.get('/healthcheck', async (req, res) => {
    try {
        const [result] = await db.query('SELECT 1 AS solution');

        if (result[0] && result[0].solution === 1) {
            res.status(200).json({ status: 'OK', message: 'Połączenie z bazą danych jest aktywne.' });
        } else {
            res.status(500).json({ status: 'Error', message: 'Baza danych odpowiedziała niepoprawnie.' });
        }
    } catch (error) {
        console.error('Błąd połączenia z bazą danych:', error);
        res.status(500).json({ status: 'Error', message: 'Nie można połączyć się z bazą danych.', error: error.message });
    }
});

router.get('/preview', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT name, price, unit, image_url FROM products');
        res.status(200).json({ rows });
    } catch (error) {
        console.error('Błąd pobierania produktów:', error.message);
        res.status(500).json({ status: 'Error', message: 'Nie można pobrać produktów', error: error });
    }
});



module.exports = router;
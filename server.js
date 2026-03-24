const express = require('express');
const cors = require('cors');
const path = require('path');
const { poolPromise } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (index.html, etc) from the current directory
app.use(express.static(__dirname));

// Endpoint to run SQL queries
app.post('/api/query', async (req, res) => {
    try {
        const query = req.body.query;
        if (!query) {
            return res.status(400).json({ error: 'Query is missing' });
        }
        
        const pool = await poolPromise;
        if (!pool) {
            return res.status(500).json({ error: 'Database connection is not established on the server.' });
        }

        const result = await pool.request().query(query);
        
        res.json({ 
            data: result.recordset || (result.recordsets && result.recordsets[0]) || [], 
            rowsAffected: result.rowsAffected 
        });
    } catch (err) {
        console.error('SQL Error: ', err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/index.html in your browser.`);
});

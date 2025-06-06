import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Helper function to get cat data
async function getCatData(url) {
    try {
        const response = await axios.get(url, {
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cat:', error.message);
        throw error;
    }
}

// Routes
app.get('/', async (req, res) => {
    try {
        const catData = await getCatData('https://cataas.com/cat?json=true');
        res.render('index', {
            catData: catData,
            error: null
        });
    } catch (error) {
        res.render('index', {
            catData: null,
            error: 'Error fetching cat image'
        });
    }
});

// Random cat
app.get('/random', async (req, res) => {
    try {
        const catData = await getCatData('https://cataas.com/cat?json=true');
        res.json({
            data: catData,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Error fetching cat'
        });
    }
});

// Cat with tag
app.get('/tag/:tag', async (req, res) => {
    try {
        console.log(req.params)
        const catData = await getCatData(`https://cataas.com/cat/${req.params.tag}?json=true`);
        res.json({
            data: catData,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Error fetching cat'
        });
    }
});

// Cat saying text
app.get('/says/:text', async (req, res) => {
    try {
        const catData = await getCatData(`https://cataas.com/cat/says/${req.params.text}?json=true`);
        res.json({
            data: catData,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Error fetching cat'
        });
    }
});

// Cat with tag saying text
app.get('/tag/:tag/says/:text', async (req, res) => {
    try {
        const catData = await getCatData(`https://cataas.com/cat/${req.params.tag}/says/${req.params.text}?json=true`);
        res.json({
            data: catData,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Error fetching cat'
        });
    }
});

// Cat with type
app.get('/type/:type', async (req, res) => {
    try {
        const catData = await getCatData(`https://cataas.com/cat?type=${req.params.type}&json=true`);
        res.json({
            data: catData,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Error fetching cat'
        });
    }
});

// Cat with filter
app.get('/filter/:filter', async (req, res) => {
    try {
        const catData = await getCatData(`https://cataas.com/cat?filter=${req.params.filter}&json=true`);
        res.json({
            data: catData,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Error fetching cat'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
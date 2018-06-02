const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DIST_DIR = path.join(__dirname, '../dist');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Serving the files on the dist folder.
app.use(express.static(DIST_DIR));

app.get('/api', (req, res) => {
    res.send({ ok: true });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(process.env.PORT || 8081);

const express = require('express');
const api = express();
const port = process.env.PORT || 5000;
const body_parser = require('body-parser');
// parse JSON (apilication/json content-type)
api.use(body_parser.json());

//Connect to database
const ConnectDB = require('./config/db');
ConnectDB();

const config = require('config');

/* #region Routes */
api.use(`/${config.get('apiBaseUrl')}authentication`, require('./routes/authentication'));
api.use(`/${config.get('apiBaseUrl')}users`, require('./routes/users'));
api.use(`/${config.get('apiBaseUrl')}games`, require('./routes/games'));
api.use(`/${config.get('apiBaseUrl')}genres`, require('./routes/genres'));
api.use(`/${config.get('apiBaseUrl')}platforms`, require('./routes/platforms'));
api.use(`/${config.get('apiBaseUrl')}publishers`, require('./routes/publishers'));
api.use(`/${config.get('apiBaseUrl')}developers`, require('./routes/developers'));
/* #endregion */

// default home request
api.get('/', (req, res) => res.json({ message: `hello ${req.query.name || 'world'}!` }) );

// initialization
api.listen(port, () => console.log(`server listening at ${port}`));
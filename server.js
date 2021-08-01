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

/* #region Controllers */
api.use(`/${config.get('apiBaseUrl')}users`, require('./controllers/users'));
api.use(`/${config.get('apiBaseUrl')}games`, require('./controllers/games'));
api.use(`/${config.get('apiBaseUrl')}genres`, require('./controllers/genres'));
api.use(
  `/${config.get('apiBaseUrl')}platforms`,
  require('./controllers/platforms')
);

api.use(
  `/${config.get('apiBaseUrl')}publishers`,
  require('./controllers/publishers')
);

api.use(
  `/${config.get('apiBaseUrl')}developers`,
  require('./controllers/developers')
);
/* #endregion */

// default home request
api.get('/', (req, res) =>
  res.json({ message: `hello ${req.query.name || 'world'}!` })
);

// initialization
api.listen(port, () => console.log(`server listening at ${port}`));

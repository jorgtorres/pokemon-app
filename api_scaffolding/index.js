const express = require('express');
const bodyParser = require('express').json;
const taskRoutes = require('./src/routes/taskRoutes');
const db = require('./src/db');

const app = express();
app.use(bodyParser());

app.use('/task', taskRoutes);

// simple health
app.get('/', (req, res) => res.send({status: 'ok'}));

const PORT = process.env.PORT || 3000;
db.initialize()
	.then(() => {
		app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
	})
	.catch(err => {
		console.error('Failed to initialize DB', err);
		process.exit(1);
	});

module.exports = app;

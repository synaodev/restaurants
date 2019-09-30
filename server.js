const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(
	'mongodb://localhost/restaurants',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const review_schema = new mongoose.Schema({
	customer: { type: String, required: true, minlength: 3 },
	stars: { type: Number, required: true, min: 1, max: 5 },
	description: { type: String, required: true, minlength: 3 }
}, { timestamps: true });

const review_model = mongoose.model('review', review_schema);

const restaurant_schema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 3, unique: true },
	cuisine: { type: String, required: true, minlength: 3 },
	reviews: { type: [review_schema], required: true }
}, { timestamps: true });

const restaurant_model = mongoose.model('restaurant', restaurant_schema);

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '/public/dist/public')));
server.use(express.json());

server.get('/api/restaurants', (req, res) => {
	restaurant_model.find()
	.then(restaurant => res.json(restaurant))
	.catch(err => res.json(err));
});

server.get('/api/restaurants/:id', (req, res) => {
	const id = req.params['id'];
	restaurant_model.findById(id)
	.then(restaurant => res.json(restaurant))
	.catch(err => res.json(err));
});

server.post('/api/restaurants', (req, res) => {
	const restaurant = new restaurant_model(req.body);
	restaurant['reviews'] = [];
	restaurant.save()
	.then(result => res.json(result))
	.catch(err => res.json(err));
});

server.post('/api/restaurants/:id/review', (req, res) => {
	const id = req.params['id'];
	const review = new review_model(req.body);
	review.save()
	.then(result => {
		restaurant_model.updateOne(
			{ _id: id },
			{ 
				$push: {
					reviews: result	
				}
			}
		)
		.then(result => res.json(result))
		.catch(err => res.json(err));
	})
	.catch(err => res.json(err));
});

server.patch('/api/restaurants/:id', (req, res) => {
	const id = req.params['id'];
	restaurant_model.findById(id)
	.then(restaurant => {
		restaurant['name'] = req.body['name'];
		restaurant['cuisine'] = req.body['cuisine'];
		restaurant.save()
		.then(result => res.json(result))
		.catch(err => res.json(err));
	})
	.catch(err => res.json(err));
});

server.delete('/api/restaurants/:id', (req, res) => {
	const id = req.params['id'];
	restaurant_model.findOneAndDelete(id)
	.then(result => res.json(result))
	.catch(err => res.json(err));
});

server.get('*', (req, res, next) => {
	res.sendFile(path.resolve('./public/dist/public/index.html'));
});

server.listen(8000, console.log('Listening at port 8000!'));
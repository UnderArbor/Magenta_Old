const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGODB_URL || config.get('MongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/sinzubot");
		console.log(" Connected to MongoDB successfully.");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1);
	}
};

module.exports = connectDB;

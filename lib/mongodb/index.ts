import mongoose from "mongoose";

const connectMongoDb = async () => {
	try {
		if (process.env.MONGODB_URI) {
			await mongoose.connect(process.env.MONGODB_URI);
			console.log("connected to db");
		} else throw new Error("mongodb uri is not provided");
	} catch (err) {
		console.log(err);
	}
};
export default connectMongoDb;

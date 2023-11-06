const bcrypt = require("bcrypt");
import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
	},

	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
userSchema.statics.login = async function Login(username, password) {
	const user = await this.findOne({ username });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw new Error("Incorrect password");
	}
	throw new Error("incorrect username");
};

const User: any = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

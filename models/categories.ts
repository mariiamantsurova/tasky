import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema(
	{
		title: String,
		color: String,
		user_id: String,
	},
	{
		timestamps: true,
	},
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

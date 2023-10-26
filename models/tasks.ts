import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema(
	{
		title: String,
		category: String,
		date: Date,
		notification: Boolean,
	},
	{
		timestamps: true,
	},
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;

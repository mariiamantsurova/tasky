import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema(
	{
		task: { type: String, required: true },
		category: String,
		date: Date,
		important: Boolean,
		user_id: String,
	},
	{
		timestamps: true,
	},
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;

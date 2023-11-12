import { TaskType } from "@/stores/TasksStore";

export function getTasksByCategory(category: string, tasks: TaskType[]) {
	return tasks.filter((task) => {
		return task.category === category;
	});
}

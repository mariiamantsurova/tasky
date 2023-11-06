import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetter, StoreSetterAll, reset } from "@/types/StoreSetter";

export type TaskType = {
	_id: string;
	task: string;
	category: string;
	important: boolean;
};
export type Tasks = {
	tasks: TaskType[];
};
export const useTasksStore = createWithEqualityFn<Omit<TaskType, "_id"> & StoreSetter<Omit<TaskType, "_id">> & reset>(
	(set) => ({
		task: "",
		category: "",
		important: false,
		setValue(skey, value) {
			set({ [skey]: value });
		},
		reset() {
			set({
				task: "",
				category: "",
				important: false,
			});
		},
	}),
	shallow,
);
export const useGetTasksStore = createWithEqualityFn<Tasks & StoreSetterAll<Tasks>>(
	(set) => ({
		tasks: [],
		setValue(values) {
			set(values);
		},
	}),
	shallow,
);

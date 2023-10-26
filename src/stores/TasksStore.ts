import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetter, reset } from "@/types/StoreSetter";

type TaskType = {
	title: string;
	category: string;
	date: Date;
	notification: boolean;
};

export const useTasksStore = createWithEqualityFn<TaskType & StoreSetter<TaskType> & reset>(
	(set) => ({
		title: "",
		category: "",
		date: new Date(),
		notification: false,
		setValue(skey, value) {
			set({ [skey]: value });
		},
		reset() {
			set({
				title: "",
				category: "",
				date: new Date(),
				notification: false,
			});
		},
	}),
	shallow,
);

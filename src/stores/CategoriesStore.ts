import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetter, reset } from "@/types/StoreSetter";

type CategoryType = {
	title: string;
};

export const useCategoryStore = createWithEqualityFn<CategoryType & StoreSetter<CategoryType> & reset>(
	(set) => ({
		title: "",
		setValue(skey, value) {
			set({ [skey]: value });
		},
		reset() {
			set({
				title: "",
			});
		},
	}),
	shallow,
);

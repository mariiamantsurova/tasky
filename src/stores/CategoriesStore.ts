import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetter, StoreSetterAll, reset } from "@/types/StoreSetter";

export type CategoryType = {
	_id: string;
	title: string;
	color: string;
};
type CategoriesArray = {
	categories: CategoryType[];
};
export const useCategoryStore = createWithEqualityFn<Pick<CategoryType, "title"> & StoreSetter<Pick<CategoryType, "title">> & reset>(
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
export const useGetCategoryStore = createWithEqualityFn<CategoriesArray & StoreSetterAll<CategoriesArray>>(
	(set) => ({
		categories: [],
		setValue(values) {
			set(values);
		},
	}),
	shallow,
);

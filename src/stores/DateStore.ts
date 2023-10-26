//zustand
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetterAll } from "@/types/StoreSetter";

type DateType = {
	date: Date | undefined;
};

export const useDateStore = createWithEqualityFn<DateType & StoreSetterAll<DateType>>(
	(set) => ({
		date: new Date(),
		setValue(values) {
			set(values);
		},
	}),
	shallow,
);

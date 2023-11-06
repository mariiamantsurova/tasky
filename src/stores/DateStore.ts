//zustand
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetter } from "@/types/StoreSetter";

type DateType = {
	date: Date | undefined;
};

export const useDateStore = createWithEqualityFn<DateType & StoreSetter<DateType>>(
	(set) => ({
		date: new Date(),
		setValue(skey, value) {
			set({ [skey]: value });
		},
	}),
	shallow,
);

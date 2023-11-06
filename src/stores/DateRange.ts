//zustand
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { StoreSetter, reset } from "@/types/StoreSetter";

type DateRangeType = {
	dateStart: Date | undefined;
	dateFinish: Date | undefined;
};

export const useDateRangeStore = createWithEqualityFn<DateRangeType & StoreSetter<DateRangeType> & reset>(
	(set) => ({
		dateStart: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
		dateFinish: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7)),
		setValue(skey, value) {
			set({ [skey]: value });
		},
		reset() {
			set({
				dateStart: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
				dateFinish: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7)),
			});
		},
	}),
	shallow,
);

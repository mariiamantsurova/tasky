type States<Types> = {
	[Property in keyof Types]: Types[Property];
};

export type StoreSetterAll<Types extends Object> = {
	setValue: (values: States<Types>) => void;
};

export type StoreSetter<Types extends Object> = {
	setValue: <Skey extends keyof Types>(skey: Skey, value: Types[Skey]) => void;
};

export type reset = {
	reset: () => void;
};

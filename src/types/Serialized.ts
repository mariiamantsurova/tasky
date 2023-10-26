export type Serialized<Type extends Object> = {
	[Property in keyof Type]: string;
};

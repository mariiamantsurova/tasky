class Validator {
	static username = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
	static password = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
}
export default Validator;

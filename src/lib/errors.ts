export class EmptyParameterError extends Error {
	constructor(parameterName: string = 'Parameter') {
		super(`${parameterName} must be not empty`);
	}
}

export function requireNotEmpty(value: string, parameterName: string) {
	if (value.length == 0) {
		throw new EmptyParameterError(parameterName);
	}
}

export class NonIntegerParameterError extends Error {
	constructor(parameterName: string) {
		super(`${parameterName} must be an integer`);
	}
}

export function requireInteger(value: number, parameterName: string) {
	if (!Number.isInteger(value)) {
		throw new NonIntegerParameterError(parameterName);
	}
}
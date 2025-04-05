export class AssertionFailedError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

export function assert(condition: boolean, message?: string): asserts condition {
	if (!condition) {
		throw new AssertionFailedError(message);
	}
}

export function assertNotEmpty(value: string, objectName: string) {
	assert(value.length != 0, `${objectName} must be not empty`);
}

export function assertIsInt(value: number, objectName: string) {
	assert(Number.isInteger(value), `${objectName} must be an integer`);
}

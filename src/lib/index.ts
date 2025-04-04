// place files you want to import through the `$lib` alias in this folder.

import { requireInteger, requireNotEmpty } from '$lib/errors';

export class IDObject {
	constructor(public id: string) {
		requireNotEmpty(id, 'id');
	}
}

export class Author extends IDObject {
	constructor(
		id: string,
		public name: string,
		public educations: Education[] = [],
		public skills: Skill[] = [],
		public address?: Contact,
		public phone?: Contact,
		public email?: Contact
	) {
		super(id);
		requireNotEmpty(id, 'Author id');
		requireNotEmpty(name, 'name');
	}

	static list(...names: string[]): Author[] {
		return names.map((name, index) => new Author(index.toString(), name));
	}
}

export class TimeRange {
	constructor(
		public start: number,
		public end: number = start
	) {
		requireInteger(start, 'start');
		requireInteger(end, 'end');
		if (start > end) {
			throw new Error('Time range start must be <= time range end');
		}
	}
}

export class Education extends IDObject {
	constructor(
		id: string,
		public title: string,
		public subtitle: string = '',
		public timeRange: TimeRange
	) {
		super(id);
		requireNotEmpty(id, 'id');
		requireNotEmpty(title, 'title');
	}

	static list(...args: [title: string, subtitle: string, timeRange: TimeRange][]): Education[] {
		return args.map((value, index) => new Education(index.toString(), ...value));
	}
}

/**
 * @property {number} value integer that shows how developed is Skill. Measured in percents. Fits in range [0; 100]
 */
export class Skill extends IDObject {
	constructor(
		id: string,
		public name: string,
		public value: number
	) {
		super(id);
		requireNotEmpty(id, 'id');
		requireNotEmpty(name, 'name');
		if (!Number.isInteger(value)) {
			this.value = Math.round(value);
		}
		if (!(0 <= value && value <= 100)) {
			throw new Error('Skill must be an integer in range [0;100]');
		}
	}

	static list(skills: Record<string, number>): Skill[] {
		return Object.entries(skills).map(
			([name, value], index) => new Skill(index.toString(), name, value)
		);
	}
}

export class Contact {
	constructor(
		public value: string,
		public href: string = ''
	) {
		requireNotEmpty(value, 'Contact value');
	}
}

const URL: string = 'https://railway-strapi-production-7054.up.railway.app';

export const fetchUsers = async (): Promise<[string, number][]> => {
	const response = await fetch(`${URL}/api/persons`);

	const { data } = await response.json();

	return data.map((person: { person_name: string; id: number; }) => [person.person_name, person.id]);
};

export const fetchUserById = async (id: string) => {
	const response = await fetch(`${URL}/api/persons?populate=*`);

	const { data } = await response.json();

	return  data.find((user: { id: any; }) => `${user.id}` === id);
}

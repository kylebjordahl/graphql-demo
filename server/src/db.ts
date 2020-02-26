// this is not really a database, just an object in memory!

export const db = {
	users: [
		{
			id: `user-1`,
			name: 'Ramiro',
			age: 27,
			followedUserIds: ['user-2'],
		},
		{
			id: `user-2`,
			name: 'Gertrude',
			age: 19,
			followedUserIds: ['user-1', 'user-3'],
		},
		{
			id: 'user-3',
			name: 'Nicholas',
			followedUserIds: [],
		},
	] as User[],
	posts: [
		{
			id: 'post-1',
			authorId: 'user-1',
			title: 'Top 10 Whales of All Time',
		},
		{
			id: 'post-2',
			authorId: 'user-2',
			title: '10 Signs You Should Be Investing In Art',
		},
		{
			id: 'post-3',
			authorId: 'user-1',
			title: '7 Things About Creativity That Your Boss Wants You To Know',
		},
		{
			id: 'post-4',
			authorId: 'user-3',
			title: '4 Ways To Ruin Your Eyebrows',
		},
	] as Post[],
}

export interface User {
	id: string
	name: string
	age?: number
	followedUserIds: string[]
}

export interface Post {
	id: string
	authorId: string
	title: string
}

export interface DbContext {
	users: User[]
	posts: Post[]
}

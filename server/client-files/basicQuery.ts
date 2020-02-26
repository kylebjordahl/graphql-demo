import { gql } from 'apollo-server-core'

const posts = await client.query(gql`
posts {
	id
	title
	author {
		id
		name
	}
}`)

// rest
const users = await fetch(‘/users’)
const posts = await fetch(‘/posts’)

const postsWithAuthor = posts.map(post => ({
	...post,
	author: users.find(
		user => user.id === post.authorId,
	),
}))

const users = {
	id: 'user-1',
	name: 'Ramiro',
	age: 27,
	followingIds: [
		'user-2',
	],
	followerIds: [
		'user-2',
	],
}

const posts = [
	{
		id: 'post-1',
		author: {
			id: 'user-1',
		},
		title: 'Top 10 Whales of All Time',
	},
]

const query = gql`
query {
  	posts {
    	id
   		title
    	author {
      		id
      		name
      		followers {
        		id
        		name
      		}
    	}
  	}
}
`

const result = {
	data: {
		posts: [
			{
				id: 'post-1',
				title: 'Top 10 Whales of All Time',
				author: {
					id: 'user-1',
					name: 'Ramiro',
					following: [
						{
							id: 'user-2',
							name: 'Gertrude',
						},
					],
					followers: [
						{
							id: 'user-2',
							name: 'Gertrude',
						},
					],
				},
			}

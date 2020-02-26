import { gql } from 'apollo-server-express'

export default gql`

type Query {
	"""The users query will return all users"""
	users: [User!]!
	user(id: ID!): User!
	"""
	The posts query has one optional filter argument, authorId,
	which will cause it to return only posts by that author
	"""
	posts(authorId: ID): [Post!]!
	post(id: ID!): Post!
}

type Mutation {
	publishPost(
		authorId: ID!
		title: String!
	): Post!

	startFollowing(
		followerId: ID!
		subjectId: ID!
	): Boolean!

	stopFollowing(
		followerId: ID!
		subjectId: ID!
	): Boolean!
}

type User {
	id: ID!
	name: String!
	age: Int
	following: [User!]!
	followers: [User!]!
	posts: [Post!]!
}

type Post {
	id: ID!
	author: User!
	title: String!
}

`

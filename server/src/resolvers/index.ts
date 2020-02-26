import { ServerContext } from '../context'
import { Post, User } from '../db'
import { publishPost } from './mutations/publishPost'
import { startFollowing } from './mutations/startFollowing'
import { stopFollowing } from './mutations/stopFollowing'

export default {
	Query: {
		users: (_, __, { db }: ServerContext) => {
			return db.users
		},
		user: (_, { id }, { db }: ServerContext) => {
			return db.users.find(user => user.id === id)
		},
		posts: (_, { authorId }, { db }: ServerContext) => {
			if (authorId) {
				return db.posts.filter(p => p.authorId === authorId) || []
			}
			else {
				return db.posts
			}
		},
		post: (_, { id }, { db }: ServerContext) => {
			return db.posts.find(post => post.id === id)
		},
	},
	User: {
		following: (thisUser: User, _, { db }: ServerContext) => {
			return db.users.filter((user) => thisUser.followedUserIds.includes(user.id))
		},
		followers: (thisUser: User, _, { db }: ServerContext) => {
			return db.users.filter((user) => user.followedUserIds.includes(thisUser.id))
		},
		posts: (thisUser: User, _, { db }: ServerContext) => {
			return db.posts.filter(post => post.authorId === thisUser.id)
		},
	},
	Post: {
		author: (post: Post, _, { db }: ServerContext) => {
			return db.users.find(user => user.id === post.authorId)
		},
	},
	Mutation: {
		publishPost: publishPost,
		startFollowing: startFollowing,
		stopFollowing: stopFollowing,
	},
}

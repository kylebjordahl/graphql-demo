import { ApolloError } from 'apollo-server-core'
import { ServerContext } from '../../context'

interface Args {
	followerId: string
	subjectId: string
}

export function startFollowing(_, args: Args, { db }: ServerContext): Boolean {
	const follower = db.users.find(user => user.id === args.followerId)
	if (!follower) {
		throw new ApolloError('Could not start following, follower user not found', 'FOLLOWER_NOT_FOUND')
	}

	if (!db.users.map(user => user.id).includes(args.subjectId)) {
		throw new ApolloError('Could not start following, subject user not found', 'SUBJECT_NOT_FOUND')
	}

	const currentFollowing = new Set(follower!.followedUserIds)
	currentFollowing.add(args.subjectId)
	follower.followedUserIds = Array.from(currentFollowing.values())

	return true
}

import { ApolloError } from 'apollo-server-core'
import { ServerContext } from '../../context'

interface Args {
	followerId: string
	subjectId: string
}

export function stopFollowing(_, args: Args, { db }: ServerContext): Boolean {
	const follower = db.users.find(user => user.id === args.followerId)
	if (!follower) {
		throw new ApolloError(
			'Could not stop following, follower user not found',
			'FOLLOWER_NOT_FOUND',
		)
	}

	if (!db.users.map(user => user.id).includes(args.subjectId)) {
		throw new ApolloError(
			'Could not stop following, subject user not found',
			'SUBJECT_NOT_FOUND',
		)
	}

	const currentFollowing = new Set(follower!.followedUserIds)

	if (!currentFollowing.has(args.subjectId)) {
		throw new ApolloError(
			'Could not stop following, user is not currently followed',
			'FOLLOWER_NOT_FOLLOWING_SUBJECT',
		)
	}
	currentFollowing.delete(args.subjectId)
	follower.followedUserIds = Array.from(currentFollowing.values())

	return true
}

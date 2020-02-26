import { ServerContext } from '../../context'
import { Post } from '../../db'

interface Args {
	authorId: string,
	title: string
}

export function publishPost(_, args: Args, { db }: ServerContext): Post {

	const newPost = {
		// NOTE: definitely not a feasible ID scheme...
		id: `post-${db.posts.length}`,
		authorId: args.authorId,
		title: args.title,
	}

	db.posts = db.posts.concat([newPost])

	return newPost
}

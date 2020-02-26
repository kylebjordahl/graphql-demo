
import ApolloClient, {
	ErrorPolicy,
	FetchPolicy,
	MutationOptions,
	OperationVariables,
	QueryOptions,
	SubscriptionOptions,
	WatchQueryOptions,
} from 'apollo-client'

// gql2 - to ignore apollo extention validation
// for now there is no better way
import gql2 from 'graphql-tag'

// rx library
import { from, observable } from 'rxjs'
import { map } from 'rxjs/operators'

// tslint:disable

// types enum

export enum QueryObjectTypes {
	User = 'User',
	Post = 'Post',
}
	

// types
export type ID = string
type String = string
type Int = number
type Boolean = boolean
type Upload = any

export enum CacheControlScope {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export interface User {
	id: ID
	name: String
	age?: Int
	following: User[]
	followers: User[]
	posts: Post[]
}

export interface Post {
	id: ID
	author: User
	title: String
}


// Query props -----------------------------------
interface QueryUserProps {
	id: ID
}

interface QueryPostsProps {
	authorId?: ID
}

interface QueryPostProps {
	id: ID
}


// Query apis ------------------------------------
class Query {

	constructor(private client: ApolloClient<any>, private defaultOptions: GraphqlCallOptions = {}) { }

	users(
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'UserData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query users {
			users {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		// apollo call
		return this.client.query({
			...mergedOptions,
			query,
		}).then(result => getResultData<User[]>(result, 'users'))
	}

	user(
		props: QueryUserProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'UserData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query user($id: ID!) {
			user(id: $id) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		// apollo call
		return this.client.query({
			...mergedOptions,
			query,
			variables: props,
		}).then(result => getResultData<User>(result, 'user'))
	}

	posts(
		props: QueryPostsProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query posts($authorId: ID) {
			posts(authorId: $authorId) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		// apollo call
		return this.client.query({
			...mergedOptions,
			query,
			variables: props,
		}).then(result => getResultData<Post[]>(result, 'posts'))
	}

	post(
		props: QueryPostProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query post($id: ID!) {
			post(id: $id) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		// apollo call
		return this.client.query({
			...mergedOptions,
			query,
			variables: props,
		}).then(result => getResultData<Post>(result, 'post'))
	}
}


// WatchQuery props -----------------------------------


// WatchQuery apis ------------------------------------
class WatchQuery {

	constructor(private client: ApolloClient<any>, private defaultOptions: GraphqlCallOptions = {}) { }

	users(
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedWatchQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'UserData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query users {
			users {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		const zenObs = this.client.watchQuery<User[]>({
			...mergedOptions,
			query,
		})

		return from(fixObservable(zenObs)).pipe(
			map(result => getResultData<User[]>(result, 'users'))
		)
	}

	user(
		props: QueryUserProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedWatchQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'UserData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query user($id: ID!) {
			user(id: $id) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		const zenObs = this.client.watchQuery<User>({
			...mergedOptions,
			query,
			variables: props,
		})

		return from(fixObservable(zenObs)).pipe(
			map(result => getResultData<User>(result, 'user'))
		)
	}

	posts(
		props: QueryPostsProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedWatchQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query posts($authorId: ID) {
			posts(authorId: $authorId) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		const zenObs = this.client.watchQuery<Post[]>({
			...mergedOptions,
			query,
			variables: props,
		})

		return from(fixObservable(zenObs)).pipe(
			map(result => getResultData<Post[]>(result, 'posts'))
		)
	}

	post(
		props: QueryPostProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedWatchQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query post($id: ID!) {
			post(id: $id) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		const zenObs = this.client.watchQuery<Post>({
			...mergedOptions,
			query,
			variables: props,
		})

		return from(fixObservable(zenObs)).pipe(
			map(result => getResultData<Post>(result, 'post'))
		)
	}
}


// RefetchQuery props -----------------------------------
interface QueryUserProps {
	id: ID
}

interface QueryPostsProps {
	authorId?: ID
}

interface QueryPostProps {
	id: ID
}


// RefetchQuery apis ------------------------------------
class RefetchQuery {

	constructor(private client: ApolloClient<any>, private defaultOptions: GraphqlCallOptions = {}) { }

	users(
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'UserData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query users {
			users {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		return {
			query,
		}
	}

	user(
		props: QueryUserProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'UserData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query user($id: ID!) {
			user(id: $id) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		return {
			query,
			variables: props,
		}
	}

	posts(
		props: QueryPostsProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query posts($authorId: ID) {
			posts(authorId: $authorId) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		return {
			query,
			variables: props,
		}
	}

	post(
		props: QueryPostProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedQueryOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const query = gql2`
		query post($id: ID!) {
			post(id: $id) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		return {
			query,
			variables: props,
		}
	}
}


// Mutation props -----------------------------------
interface MutationPublishPostProps {
	authorId: ID
	title: String
}

interface MutationStartFollowingProps {
	followerId: ID
	subjectId: ID
}

interface MutationStopFollowingProps {
	followerId: ID
	subjectId: ID
}


// Mutation apis ------------------------------------
class Mutation {

	constructor(private client: ApolloClient<any>, private defaultOptions: GraphqlCallOptions = {}) { }

	publishPost(
		props: MutationPublishPostProps,
		fragment: string,
		options?: GraphqlCallOptions & FragmentOptions & OmittedMutationOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
		const fragmentName = mergedOptions.fragmentName || getFirstFragmentName(fragment) || 'PostData'

		const finishedFragment = fragment
		
		// build query
		const mutation = gql2`
		mutation publishPost($authorId: ID!, $title: String!) {
			publishPost(authorId: $authorId, title: $title) {
				...${fragmentName}
			}
		}

		${finishedFragment}
		`
		// apollo call
		return this.client.mutate({
			...mergedOptions,
			mutation,
			variables: props,
		}).then(result => getResultData<Post>(result, 'publishPost'))
	}

	startFollowing(
		props: MutationStartFollowingProps,
		
		options?: GraphqlCallOptions  & OmittedMutationOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
	// build query
		const mutation = gql2`
		mutation startFollowing($followerId: ID!, $subjectId: ID!) {
			startFollowing(followerId: $followerId, subjectId: $subjectId)
		}
		`
		// apollo call
		return this.client.mutate({
			...mergedOptions,
			mutation,
			variables: props,
		}).then(result => getResultData<Boolean>(result, 'startFollowing'))
	}

	stopFollowing(
		props: MutationStopFollowingProps,
		
		options?: GraphqlCallOptions  & OmittedMutationOptions,
	) {
	
		const mergedOptions = {
			...<any>this.defaultOptions,
			...options,
		}

		
	// build query
		const mutation = gql2`
		mutation stopFollowing($followerId: ID!, $subjectId: ID!) {
			stopFollowing(followerId: $followerId, subjectId: $subjectId)
		}
		`
		// apollo call
		return this.client.mutate({
			...mergedOptions,
			mutation,
			variables: props,
		}).then(result => getResultData<Boolean>(result, 'stopFollowing'))
	}
}



// helper types
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type OmittedQueryOptions = Omit<Partial<QueryOptions<OperationVariables>>, 'query' | 'variables'>
type OmittedWatchQueryOptions = Omit<Partial<WatchQueryOptions<OperationVariables>>, 'variables' | 'query'>

type OmittedMutationOptions = Omit<Partial<MutationOptions<OperationVariables>>, 'mutation' | 'variables'>




interface FragmentOptions {
	fragmentName?: string
}

interface GraphqlCallOptions {
	fetchPolicy?: FetchPolicy
	errorPolicy?: ErrorPolicy
}

interface DefaultOptions {
	query?: GraphqlCallOptions
	watchQuery?: GraphqlCallOptions
	mutation?: Omit<GraphqlCallOptions, 'fetchPolicy'>
	
}

export interface Client {
	query: Query
	watchQuery: WatchQuery
	refetchQuery: RefetchQuery
	mutation: Mutation
	
}

export default function (client: ApolloClient<any>, defaultOptions: DefaultOptions = {}): Client {
	return {
		query: new Query(client, defaultOptions.query || {}),
		watchQuery: new WatchQuery(client, defaultOptions.query || {}),
		refetchQuery: new RefetchQuery(client, defaultOptions.query || {}),
		mutation: new Mutation(client, defaultOptions.mutation || {}),
		
	}
}

function fixObservable(obs: any) {
	(obs as any)[observable] = () => obs
	return obs
}

function getResultData<T>(result, dataFieldName) {
	// if error, throw it
	if (result.errors) {
		throw new Error(<any>result.errors)
	}

	if (!result.data) {
		return <T><any>null
	}

	// cast the result and return (need any for scalar types, to avoid compilation error)
	return <T><any>result.data[dataFieldName]
}

function getFirstFragmentName(fragment: string | Object) {

	if (typeof fragment !== 'object') { return }
	if (
		!fragment['definitions'] ||
		!fragment['definitions'][0] ||
		!fragment['definitions'][0].name ||
		!fragment['definitions'][0].name.value
	) { return }

	return fragment['definitions'][0].name.value
}

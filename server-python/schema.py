"""
compare this to `server/src/schema.ts`
"""

import typing 
import strawberry
import db 

@strawberry.type
class User():
    # since these fields are the same between the db object and the GQL type, we don't need to have a resolver!
    id: strawberry.ID
    name: str
    age: int

    #this decorator marks the field as needing "extra" processing, i.e. linking the actual users by id
    @strawberry.field
    # we type-annotate self to db.User because that's the actual type we get here from the query field
    def following(self:db.User)->'typing.List[User]':
        # what I'm doing here is just fake DB access, we can put whatever code we want here!
        return [u for u in db.db.users if u.id in self.followedUserIds]
    @strawberry.field
    def followers(self:db.User)-> 'typing.List[User]':
        # note the switch in the if case!
        return [u for u in db.db.users if self.id in u.followedUserIds]
    def posts(self:db.User)-> 'typing.List[Post]':
        return [p for p in db.db.posts if p.authorId==self.id]

@strawberry.type
class Post():
    
    id: strawberry.ID
    
    title: str

    @strawberry.field
    def author(self:db.Post)-> User:
        return next([u for u in db.db.users if u.id==self.authorId])
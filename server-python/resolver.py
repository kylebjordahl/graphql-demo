
import typing

import strawberry

import schema
from db import db

@strawberry.type
class Query:
    @strawberry.field
    def users(self)->list[schema.User]:
        return db.users
    
    @strawberry.field
    def user(self, id: strawberry.ID)->schema.User:
        return next(u for u in db.users if u.id==id)

    @strawberry.field
    def posts(self, authorId: strawberry.ID)->list[schema.Post]:
        return next(p for p in db.posts if p.authorId==authorId)
    
    @strawberry.field
    def post(self, id: strawberry.ID)->schema.Post:
        return next(p for p in db.posts if p.id==id)

    

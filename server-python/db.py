"""
this is a silly abstraction!
"""

from dataclasses import dataclass
from typing import List, Optional

@dataclass
class User:
    id: str
    name: str
    followedUserIds: List[str]
    age: Optional[int] = None


@dataclass
class Post:
    id: str
    authorId: str
    title: str

class db:
    users= [
        User(
            id= 'user-1',
            name= 'Ramiro',
            age= 27,
            followedUserIds= ['user-2'],
        ),
        User(
            id= 'user-2',
            name= 'Gertrude',
            age= 19,
            followedUserIds= ['user-1', 'user-3'],
        ),
        User(
            id= 'user-3',
            name= 'Nicholas',
            followedUserIds= [],
        ),
    ]
    
    posts= [
        Post(
            id= 'post-1',
            authorId= 'user-1',
            title= 'Top 10 Whales of All Time',
        ),
        Post(
            id= 'post-2',
            authorId= 'user-2',
            title= '10 Signs You Should Be Investing In Art',
        ),
        Post(
            id= 'post-3',
            authorId= 'user-1',
            title= '7 Things About Creativity That Your Boss Wants You To Know',
        ),
        Post(
            id= 'post-4',
            authorId= 'user-3',
            title= '4 Ways To Ruin Your Eyebrows',
        ),
    ]





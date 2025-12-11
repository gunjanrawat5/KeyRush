# backend/schemas.py
from pydantic import BaseModel
from datetime import datetime

# User schemas

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True


# score schemas
class ScoreCreate(BaseModel):
    user_id: int 
    wpm: float
    accuracy: float


class ScoreOut(BaseModel):
    id: int
    user_id: int
    username: str
    wpm: float
    accuracy: float
    created_at: datetime

    class Config:
        orm_mode = True

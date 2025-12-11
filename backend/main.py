
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import User, Score
from schemas import UserCreate, UserLogin, UserOut, ScoreCreate, ScoreOut

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables (users + scores)
Base.metadata.create_all(bind=engine)


#routes

@app.get("/")
def root():
    return {"message": "KeyRush backend is running"}


@app.post("/signup", response_model=UserOut)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == payload.username).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )

    user = User(username=payload.username, password=payload.password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == payload.username).first()

    if not user or user.password != payload.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return {
        "message": "Login successful",
        "user_id": user.id,
        "username": user.username,
    }


# save a score

@app.post("/scores", response_model=ScoreOut)
def submit_score(payload: ScoreCreate, db: Session = Depends(get_db)):
    # Check that the user exists
    user = db.query(User).filter(User.id == payload.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found",
        )

    score = Score(
        user_id=user.id,
        wpm=payload.wpm,
        accuracy=payload.accuracy,
    )

    db.add(score)
    db.commit()
    db.refresh(score)

    return ScoreOut(
        id=score.id,
        user_id=score.user_id,
        username=user.username,
        wpm=score.wpm,
        accuracy=score.accuracy,
        created_at=score.created_at,
    )


# overall leaderboard top 10 scores

@app.get("/leaderboard", response_model=list[ScoreOut])
def get_leaderboard(db: Session = Depends(get_db), limit: int = 10):
    rows = (
        db.query(Score, User)
        .join(User, Score.user_id == User.id)
        .order_by(Score.wpm.desc(), Score.accuracy.desc(), Score.created_at.asc())
        .limit(limit)
        .all()
    )

    result: list[ScoreOut] = []
    for score, user in rows:
        result.append(
            ScoreOut(
                id=score.id,
                user_id=score.user_id,
                username=user.username,
                wpm=score.wpm,
                accuracy=score.accuracy,
                created_at=score.created_at,
            )
        )
    return result


# personal stats for one user 

@app.get("/my-stats/{user_id}", response_model=list[ScoreOut])
def get_my_stats(user_id: int, db: Session = Depends(get_db)):
    rows = (
        db.query(Score, User)
        .join(User, Score.user_id == User.id)
        .filter(Score.user_id == user_id)
        .order_by(Score.created_at.desc())
        .all()
    )

    result: list[ScoreOut] = []
    for score, user in rows:
        result.append(
            ScoreOut(
                id=score.id,
                user_id=score.user_id,
                username=user.username,
                wpm=score.wpm,
                accuracy=score.accuracy,
                created_at=score.created_at,
            )
        )
    return result

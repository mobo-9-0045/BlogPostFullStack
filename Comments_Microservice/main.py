# main.py
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware;
from sqlalchemy.orm import Session
from models import Comment
from database import SessionLocal, engine, Base
from pydantic import BaseModel
from typing import List

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CommentCreate(BaseModel):
    content: str
    user_id: int
    blogpost_id: int

class CommentResponse(CommentCreate):
    id: int
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@app.get('/fastapi/get')
def get_fastapi():
    return {'response': 'fastapi'};

@app.post("/create/comments/", response_model=CommentResponse)
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    db_comment = Comment(**comment.dict())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

@app.get("/getall/comments/", response_model=List[CommentResponse])
def read_comments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    comments = db.query(Comment).offset(skip).limit(limit).all()
    return comments

@app.get("/getByBlogId/comments/{blogpost_id}", response_model=CommentResponse)
def read_comment(blogpost_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.blogpost_id == blogpost_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment
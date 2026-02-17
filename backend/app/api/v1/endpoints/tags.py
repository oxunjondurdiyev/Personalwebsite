from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.post import Tag, TagCreate
from app.services import post_service
from app.api.deps import get_current_admin_user
from app.models.models import User

router = APIRouter()

@router.get("/", response_model=List[Tag])
def get_tags(db: Session = Depends(get_db)):
    return post_service.get_tags(db)

@router.get("/{tag_id}", response_model=Tag)
def get_tag(tag_id: int, db: Session = Depends(get_db)):
    tag = post_service.get_tag(db, tag_id=tag_id)
    if tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag

@router.post("/", response_model=Tag)
def create_tag(
    tag: TagCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    return post_service.create_tag(db=db, tag=tag)

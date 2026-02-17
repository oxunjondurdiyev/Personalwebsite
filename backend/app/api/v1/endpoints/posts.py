from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.post import Post, PostCreate, PostUpdate
from app.services import post_service
from app.api.deps import get_current_active_user, get_current_admin_user
from app.models.models import User

router = APIRouter()

@router.get("/", response_model=List[Post])
def get_posts(
    skip: int = 0,
    limit: int = 10,
    published_only: bool = True,
    db: Session = Depends(get_db)
):
    posts = post_service.get_posts(db, skip=skip, limit=limit, published_only=published_only)
    return posts

@router.get("/search", response_model=List[Post])
def search_posts(
    q: str = Query(..., min_length=1),
    language: str = Query("en", regex="^(uz|en|ru)$"),
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    posts = post_service.search_posts(db, query=q, language=language, skip=skip, limit=limit)
    return posts

@router.get("/count")
def get_post_count(db: Session = Depends(get_db)):
    count = post_service.get_post_count(db)
    return {"count": count}

@router.get("/{post_id}", response_model=Post)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = post_service.get_post(db, post_id=post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    post_service.increment_post_views(db, post_id)
    return post

@router.get("/slug/{slug}", response_model=Post)
def get_post_by_slug(
    slug: str,
    language: str = Query("en", regex="^(uz|en|ru)$"),
    db: Session = Depends(get_db)
):
    post = post_service.get_post_by_slug(db, slug=slug, language=language)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    post_service.increment_post_views(db, post.id)
    return post

@router.post("/", response_model=Post)
def create_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return post_service.create_post(db=db, post=post, author_id=current_user.id)

@router.put("/{post_id}", response_model=Post)
def update_post(
    post_id: int,
    post_update: PostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_post = post_service.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    if db_post.author_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    updated_post = post_service.update_post(db=db, post_id=post_id, post_update=post_update)
    return updated_post

@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    db_post = post_service.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    post_service.delete_post(db=db, post_id=post_id)
    return {"message": "Post deleted successfully"}

@router.get("/category/{category_id}", response_model=List[Post])
def get_posts_by_category(
    category_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    posts = post_service.get_posts_by_category(db, category_id=category_id, skip=skip, limit=limit)
    return posts

@router.get("/tag/{tag_id}", response_model=List[Post])
def get_posts_by_tag(
    tag_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    posts = post_service.get_posts_by_tag(db, tag_id=tag_id, skip=skip, limit=limit)
    return posts

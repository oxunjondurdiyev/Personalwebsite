from sqlalchemy.orm import Session
from app.models.models import Post, Tag, Category
from app.schemas.post import PostCreate, PostUpdate
from typing import Optional, List
from datetime import datetime

def get_post(db: Session, post_id: int) -> Optional[Post]:
    return db.query(Post).filter(Post.id == post_id).first()

def get_post_by_slug(db: Session, slug: str, language: str = "en") -> Optional[Post]:
    if language == "uz":
        return db.query(Post).filter(Post.slug_uz == slug).first()
    elif language == "ru":
        return db.query(Post).filter(Post.slug_ru == slug).first()
    else:
        return db.query(Post).filter(Post.slug_en == slug).first()

def get_posts(db: Session, skip: int = 0, limit: int = 10, published_only: bool = True):
    query = db.query(Post)
    if published_only:
        query = query.filter(Post.is_published == True)
    return query.order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

def get_posts_by_category(db: Session, category_id: int, skip: int = 0, limit: int = 10):
    return db.query(Post).filter(
        Post.category_id == category_id,
        Post.is_published == True
    ).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

def get_posts_by_tag(db: Session, tag_id: int, skip: int = 0, limit: int = 10):
    tag = db.query(Tag).filter(Tag.id == tag_id).first()
    if not tag:
        return []
    return [post for post in tag.posts if post.is_published]

def search_posts(db: Session, query: str, language: str = "en", skip: int = 0, limit: int = 10):
    search_term = f"%{query}%"
    if language == "uz":
        return db.query(Post).filter(
            (Post.title_uz.ilike(search_term) | Post.content_uz.ilike(search_term)),
            Post.is_published == True
        ).offset(skip).limit(limit).all()
    elif language == "ru":
        return db.query(Post).filter(
            (Post.title_ru.ilike(search_term) | Post.content_ru.ilike(search_term)),
            Post.is_published == True
        ).offset(skip).limit(limit).all()
    else:
        return db.query(Post).filter(
            (Post.title_en.ilike(search_term) | Post.content_en.ilike(search_term)),
            Post.is_published == True
        ).offset(skip).limit(limit).all()

def create_post(db: Session, post: PostCreate, author_id: int) -> Post:
    db_post = Post(
        **post.model_dump(exclude={"tag_ids"}),
        author_id=author_id
    )

    if post.is_published and not db_post.published_at:
        db_post.published_at = datetime.utcnow()

    if post.tag_ids:
        tags = db.query(Tag).filter(Tag.id.in_(post.tag_ids)).all()
        db_post.tags = tags

    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_post(db: Session, post_id: int, post_update: PostUpdate) -> Optional[Post]:
    db_post = get_post(db, post_id)
    if not db_post:
        return None

    update_data = post_update.model_dump(exclude_unset=True, exclude={"tag_ids"})

    if post_update.is_published and not db_post.is_published:
        update_data["published_at"] = datetime.utcnow()

    for field, value in update_data.items():
        setattr(db_post, field, value)

    if post_update.tag_ids is not None:
        tags = db.query(Tag).filter(Tag.id.in_(post_update.tag_ids)).all()
        db_post.tags = tags

    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int) -> bool:
    db_post = get_post(db, post_id)
    if db_post:
        db.delete(db_post)
        db.commit()
        return True
    return False

def increment_post_views(db: Session, post_id: int):
    db_post = get_post(db, post_id)
    if db_post:
        db_post.views_count += 1
        db.commit()

def get_category(db: Session, category_id: int) -> Optional[Category]:
    return db.query(Category).filter(Category.id == category_id).first()

def get_categories(db: Session):
    return db.query(Category).all()

def create_category(db: Session, category):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_tag(db: Session, tag_id: int) -> Optional[Tag]:
    return db.query(Tag).filter(Tag.id == tag_id).first()

def get_tags(db: Session):
    return db.query(Tag).all()

def create_tag(db: Session, tag):
    db_tag = Tag(**tag.model_dump())
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

def get_post_count(db: Session) -> int:
    return db.query(Post).filter(Post.is_published == True).count()

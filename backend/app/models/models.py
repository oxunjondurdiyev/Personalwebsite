from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

post_tags = Table(
    'post_tags',
    Base.metadata,
    Column('post_id', Integer, ForeignKey('posts.id', ondelete='CASCADE')),
    Column('tag_id', Integer, ForeignKey('tags.id', ondelete='CASCADE'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    role = Column(String, default="editor")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    posts = relationship("Post", back_populates="author")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name_uz = Column(String, nullable=False)
    name_en = Column(String, nullable=False)
    name_ru = Column(String, nullable=False)
    slug_uz = Column(String, unique=True, index=True, nullable=False)
    slug_en = Column(String, unique=True, index=True, nullable=False)
    slug_ru = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="category")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name_uz = Column(String, nullable=False)
    name_en = Column(String, nullable=False)
    name_ru = Column(String, nullable=False)
    slug_uz = Column(String, unique=True, index=True, nullable=False)
    slug_en = Column(String, unique=True, index=True, nullable=False)
    slug_ru = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", secondary=post_tags, back_populates="tags")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title_uz = Column(String, nullable=False)
    title_en = Column(String, nullable=False)
    title_ru = Column(String, nullable=False)
    slug_uz = Column(String, unique=True, index=True, nullable=False)
    slug_en = Column(String, unique=True, index=True, nullable=False)
    slug_ru = Column(String, unique=True, index=True, nullable=False)
    content_uz = Column(Text, nullable=False)
    content_en = Column(Text, nullable=False)
    content_ru = Column(Text, nullable=False)
    excerpt_uz = Column(Text)
    excerpt_en = Column(Text)
    excerpt_ru = Column(Text)
    meta_description_uz = Column(String)
    meta_description_en = Column(String)
    meta_description_ru = Column(String)
    featured_image = Column(String)
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    views_count = Column(Integer, default=0)
    author_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at = Column(DateTime)

    author = relationship("User", back_populates="posts")
    category = relationship("Category", back_populates="posts")
    tags = relationship("Tag", secondary=post_tags, back_populates="posts")

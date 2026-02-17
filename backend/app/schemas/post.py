from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class TagBase(BaseModel):
    name_uz: str
    name_en: str
    name_ru: str
    slug_uz: str
    slug_en: str
    slug_ru: str

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name_uz: str
    name_en: str
    name_ru: str
    slug_uz: str
    slug_en: str
    slug_ru: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PostBase(BaseModel):
    title_uz: str
    title_en: str
    title_ru: str
    slug_uz: str
    slug_en: str
    slug_ru: str
    content_uz: str
    content_en: str
    content_ru: str
    excerpt_uz: Optional[str] = None
    excerpt_en: Optional[str] = None
    excerpt_ru: Optional[str] = None
    meta_description_uz: Optional[str] = None
    meta_description_en: Optional[str] = None
    meta_description_ru: Optional[str] = None
    featured_image: Optional[str] = None
    is_published: bool = False
    is_featured: bool = False
    category_id: Optional[int] = None

class PostCreate(PostBase):
    tag_ids: Optional[List[int]] = []

class PostUpdate(BaseModel):
    title_uz: Optional[str] = None
    title_en: Optional[str] = None
    title_ru: Optional[str] = None
    slug_uz: Optional[str] = None
    slug_en: Optional[str] = None
    slug_ru: Optional[str] = None
    content_uz: Optional[str] = None
    content_en: Optional[str] = None
    content_ru: Optional[str] = None
    excerpt_uz: Optional[str] = None
    excerpt_en: Optional[str] = None
    excerpt_ru: Optional[str] = None
    meta_description_uz: Optional[str] = None
    meta_description_en: Optional[str] = None
    meta_description_ru: Optional[str] = None
    featured_image: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None
    category_id: Optional[int] = None
    tag_ids: Optional[List[int]] = None

class Post(PostBase):
    id: int
    views_count: int
    author_id: int
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None
    category: Optional[Category] = None
    tags: List[Tag] = []

    class Config:
        from_attributes = True

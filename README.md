# 🌍 Multilingual Personal Website

A production-ready, modern personal website with multilingual support (Uzbek, English, Russian) featuring a secure admin panel for content management.

## ✨ Features

### 🌐 Multilingual Support
- **3 Languages**: Uzbek (default), English, Russian
- **URL-based routing**: `/uz/`, `/en/`, `/ru/`
- **Language toggle** in navigation
- **SEO-friendly** multilingual structure
- **localStorage** language preference

### 📝 Content Management
- Full CRUD operations for posts
- Multilingual content (title, content, slug, meta for all languages)
- Category and tag management
- Draft/Publish toggle
- Markdown editor support
- Featured images
- View counter

### 🔐 Security
- JWT authentication (access + refresh tokens)
- Bcrypt password hashing
- Role-based access control (admin/editor)
- CSRF protection
- Input validation with Pydantic
- Rate limiting via Nginx
- Secure headers

### 🎨 UI/UX
- Clean, professional design
- Dark/Light mode toggle
- Fully responsive
- Smooth animations
- Mobile-friendly navigation
- SEO optimized

### 🏗️ Technical Stack

**Backend:**
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL (SQLite for development)
- JWT authentication
- Pydantic validation

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- next-intl for i18n
- Axios for API calls
- React Markdown

**DevOps:**
- Docker & Docker Compose
- Nginx reverse proxy
- Production-ready configuration

## 📦 Project Structure

```
Personalwebsite/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── endpoints/
│   │   │           ├── auth.py
│   │   │           ├── posts.py
│   │   │           ├── categories.py
│   │   │           ├── tags.py
│   │   │           └── users.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   └── session.py
│   │   ├── models/
│   │   │   └── models.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── post.py
│   │   │   └── token.py
│   │   ├── services/
│   │   │   ├── user_service.py
│   │   │   └── post_service.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx (Home)
│   │   │   ├── about/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── admin/
│   │   │       ├── page.tsx (Dashboard)
│   │   │       ├── login/page.tsx
│   │   │       └── posts/[id]/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx
│   │   └── ui/
│   │       └── PostCard.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── messages/
│   │   ├── uz.json
│   │   ├── en.json
│   │   └── ru.json
│   ├── middleware.ts
│   ├── i18n.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
├── nginx.conf
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (for production)
- PostgreSQL (for production)

### Development Setup

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Personalwebsite
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env
# Edit .env with your configuration

# Run the backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Run the frontend
npm run dev
```

Frontend will be available at: http://localhost:3000

### Production Deployment with Docker

#### 1. Configure Environment Variables

```bash
cp .env.example .env
# Edit .env with your production values
```

#### 2. Build and Start Services

```bash
# Build and start all services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost (via Nginx)
- Backend API: http://localhost/api/
- API Docs: http://localhost/docs

#### 3. Create First Admin User

```bash
# Access backend container
docker-compose exec backend bash

# Create superuser (you can also use environment variables)
python -c "
from app.db.session import SessionLocal
from app.services.user_service import create_user
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

db = SessionLocal()
user = UserCreate(
    email='admin@example.com',
    username='admin',
    password='YourSecurePassword123',
    full_name='Admin User'
)
created_user = create_user(db, user)
created_user.is_superuser = True
db.commit()
print('Admin user created successfully!')
"
```

## 🔑 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/personal_website
# For SQLite (development): DATABASE_URL=sqlite:///./test.db

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# First Superuser
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin123

# CORS
BACKEND_CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# PostgreSQL (for docker-compose)
POSTGRES_DB=personal_website
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh access token

### Posts
- `GET /api/v1/posts/` - Get all posts
- `GET /api/v1/posts/{id}` - Get post by ID
- `GET /api/v1/posts/slug/{slug}` - Get post by slug
- `GET /api/v1/posts/search` - Search posts
- `POST /api/v1/posts/` - Create post (auth required)
- `PUT /api/v1/posts/{id}` - Update post (auth required)
- `DELETE /api/v1/posts/{id}` - Delete post (admin required)

### Categories
- `GET /api/v1/categories/` - Get all categories
- `POST /api/v1/categories/` - Create category (admin required)

### Tags
- `GET /api/v1/tags/` - Get all tags
- `POST /api/v1/tags/` - Create tag (admin required)

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update current user
- `GET /api/v1/users/` - Get all users (admin required)

## 🌍 Multilingual Implementation

### Database Schema
Each content model (Post, Category, Tag) has fields for all languages:
- `title_uz`, `title_en`, `title_ru`
- `content_uz`, `content_en`, `content_ru`
- `slug_uz`, `slug_en`, `slug_ru`
- `meta_description_uz`, `meta_description_en`, `meta_description_ru`

### URL Structure
- Uzbek: `/uz/blog/maqola-nomi`
- English: `/en/blog/article-name`
- Russian: `/ru/blog/nazvanie-stati`

### Language Switching
The language switcher in the navbar allows users to switch between languages while maintaining the current page context.

## 🔒 Security Best Practices

1. **Change default credentials** in production
2. **Use strong SECRET_KEY** (min 32 characters)
3. **Enable HTTPS** in production (configure nginx.conf)
4. **Set up SSL certificates** (Let's Encrypt recommended)
5. **Configure CORS** properly for your domain
6. **Enable rate limiting** in Nginx
7. **Regular backups** of PostgreSQL database
8. **Keep dependencies updated**

## 📝 Admin Panel Usage

### Access Admin Panel
1. Navigate to `/{locale}/admin/login`
2. Login with your credentials
3. Default: `admin@example.com` / `admin123` (change immediately!)

### Create New Post
1. Go to Admin Panel → Posts
2. Click "New Post"
3. Fill in all 3 language versions
4. Add category and tags
5. Toggle "Published" when ready
6. Click "Save Post"

### Manage Categories & Tags
- Create categories/tags with names in all 3 languages
- Use slug-friendly names (lowercase, hyphens)

## 🛠️ Development

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Database Migrations (Alembic)
```bash
cd backend

# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## 📊 Monitoring & Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx

# Database logs
docker-compose logs -f db
```

## 🚀 GitHub Deployment Commands

### Initial Setup
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Multilingual personal website with admin panel"

# Set main branch
git branch -M main

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

### Subsequent Updates
```bash
# Add changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## 🎯 Production Checklist

- [ ] Change all default passwords
- [ ] Set strong SECRET_KEY
- [ ] Configure PostgreSQL credentials
- [ ] Set up SSL certificates
- [ ] Configure domain in nginx.conf
- [ ] Enable HTTPS redirect
- [ ] Set up database backups
- [ ] Configure monitoring
- [ ] Test all functionality
- [ ] Set up error logging
- [ ] Configure email notifications (optional)
- [ ] Set up CDN for static files (optional)

## 📞 Support & Contributing

For issues, questions, or contributions, please open an issue on GitHub.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with:
- FastAPI
- Next.js
- TailwindCSS
- PostgreSQL
- Docker

---

**Made with ❤️ for multilingual content creators**

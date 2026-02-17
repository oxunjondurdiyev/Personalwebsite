# 🚀 Your Website is Now Running!

## ✅ Services Status
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Frontend (Uzbek)**: http://localhost:3000/uz
- **Frontend (English)**: http://localhost:3000/en
- **Frontend (Russian)**: http://localhost:3000/ru
- **Admin Login**: http://localhost:3000/uz/admin/login

## 🔐 Create Your Admin Account

Run this command to create your admin user:

```bash
cd /home/user/Personalwebsite/backend
source venv/bin/activate
python3 << 'EOF'
from app.db.session import SessionLocal
from app.services.user_service import create_user
from app.schemas.user import UserCreate

db = SessionLocal()

# Create your admin user
user_data = UserCreate(
    email="your-email@example.com",
    username="admin",
    password="YourSecurePassword123",
    full_name="Your Full Name",
    role="admin"
)

user = create_user(db, user_data)
user.is_superuser = True
db.commit()
print(f"✅ Admin user created: {user.email}")
db.close()
EOF
```

## 📝 Quick Actions

1. **Login to Admin**: http://localhost:3000/uz/admin/login
2. **Create Your First Post**: Click "New Post" in admin panel
3. **Fill all 3 languages**: Uzbek, English, Russian
4. **Publish**: Check "Published" and click "Save"
5. **View on Homepage**: http://localhost:3000

## 🛠️ Manage Services

**Stop services:**
```bash
# Find process IDs
ps aux | grep -E "(uvicorn|next-server)" | grep -v grep

# Kill processes
pkill -f uvicorn
pkill -f next-server
```

**Restart services:**
```bash
# Backend
cd /home/user/Personalwebsite/backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 &

# Frontend
cd /home/user/Personalwebsite/frontend
npm run dev &
```

## 📚 Important Files

- Backend code: `/home/user/Personalwebsite/backend/app/`
- Frontend code: `/home/user/Personalwebsite/frontend/`
- Database: `/home/user/Personalwebsite/backend/test.db` (SQLite)
- Logs: `/tmp/backend.log` and `/tmp/frontend.log`

## 🌍 Language URLs

- **Uzbek (default)**: http://localhost:3000/uz
- **English**: http://localhost:3000/en
- **Russian**: http://localhost:3000/ru

---

**Everything is ready! Start creating content! 🎉**

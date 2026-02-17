#!/usr/bin/env python3
"""
Create admin user for the personal website
"""

from app.db.session import SessionLocal
from app.services.user_service import create_user
from app.schemas.user import UserCreate
from app.models.models import User

def create_admin():
    db = SessionLocal()

    try:
        # Check if admin already exists
        existing = db.query(User).filter(User.email == "admin@example.com").first()

        if existing:
            print("⚠️  Admin already exists!")
            print(f"   Email: {existing.email}")
            print(f"   Username: {existing.username}")
            print("")
            print("You can login now at: http://localhost:3000/uz/admin/login")
            print("   Email: admin@example.com")
            print("   Password: admin123")
        else:
            # Create new admin user
            user_data = UserCreate(
                email="admin@example.com",
                username="admin",
                password="admin123",
                full_name="Admin User",
                role="admin"
            )
            user = create_user(db, user_data)
            user.is_superuser = True
            db.commit()

            print("🎉 SUCCESS! Admin user created!")
            print("")
            print("Login at: http://localhost:3000/uz/admin/login")
            print("   Email: admin@example.com")
            print("   Password: admin123")

    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()

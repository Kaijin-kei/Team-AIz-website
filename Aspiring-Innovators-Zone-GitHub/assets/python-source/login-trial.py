# Simple Login System in Python (Console-based)
# Works on OnlineGDB and any Python environment

# Predefined user database (in real apps, use a secure database)
users_db = {
    "admin": "admin123",
    "user1": "pass1",
    "guest": "guest"
}

def login():
    print("=== Welcome to the Login System ===")
    
    # Allow up to 3 attempts
    for attempt in range(3):
        username = input("Enter username: ").strip()
        password = input("Enter password: ").strip()
        
        # Input validation
        if not username or not password:
            print("❌ Username and password cannot be empty.\n")
            continue
        
        # Authentication check
        if username in users_db and users_db[username] == password:
            print(f"✅ Login successful! Welcome, {username}.")
            return True
        else:
            print(f"❌ Invalid credentials. Attempts left: {2 - attempt}\n")
    
    print("🚫 Too many failed attempts. Access denied.")
    return False

def main():
    if login():
        # Protected area
        print("🔒 You now have access to the system.")
    else:
        print("🔒 System locked.")

if __name__ == "__main__":
    main()


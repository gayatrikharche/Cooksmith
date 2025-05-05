import sqlite3

# Connect to your database file
conn = sqlite3.connect("cooksmith.db")
cursor = conn.cursor()

# --- View all transformed recipes ---
print("📘 Recipes:")
cursor.execute("SELECT id, original_name, goal, substr(transformed_text, 1, 200) FROM recipes")
for row in cursor.fetchall():
    print(f"ID: {row[0]} | Goal: {row[2]} | Name: {row[1]}")
    print(f"Preview: {row[3]}\n")

# --- View all Q&A entries ---
print("❓ Q&A:")
cursor.execute("SELECT id, substr(question, 1, 100), substr(answer, 1, 100) FROM questions")
for row in cursor.fetchall():
    print(f"ID: {row[0]} | Q: {row[1]} | A: {row[2]}\n")

conn.close()


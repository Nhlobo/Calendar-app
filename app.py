from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Database setup
def init_db():
    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY, 
                username TEXT, 
                password TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY, 
                user_id INTEGER, 
                title TEXT, 
                date TEXT, 
                description TEXT, 
                FOREIGN KEY(user_id) REFERENCES users(id))''')
    conn.commit()
    conn.close()

# Initialize the database
init_db()

# Home route (Calendar view)
@app.route('/')
def index():
    if 'username' in session:
        return render_template('index.html', username=session['username'])
    return redirect(url_for('login'))

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = sqlite3.connect('events.db')
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
        user = c.fetchone()
        conn.close()
        
        if user:
            session['username'] = username
            session['user_id'] = user[0]  # Store user ID in session
            return redirect(url_for('index'))
        else:
            return "Invalid login credentials"
    
    return render_template('login.html')

# Signup route
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = sqlite3.connect('events.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()
        
        return redirect(url_for('login'))
    
    return render_template('signup.html')

# Add event route
@app.route('/add_event', methods=['GET', 'POST'])
def add_event():
    if 'username' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        title = request.form['title']
        date = request.form['date']
        description = request.form['description']
        
        conn = sqlite3.connect('events.db')
        c = conn.cursor()
        c.execute("INSERT INTO events (user_id, title, date, description) VALUES (?, ?, ?, ?)",
                  (session['user_id'], title, date, description))
        conn.commit()
        conn.close()
        
        return redirect(url_for('view_events'))

    return render_template('add_event.html')

# View events route
@app.route('/view_events')
def view_events():
    if 'username' not in session:
        return redirect(url_for('login'))

    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute("SELECT * FROM events WHERE user_id = ?", (session['user_id'],))
    events = c.fetchall()
    conn.close()
    
    return render_template('view_events.html', events=events)

# Edit event route
@app.route('/edit_event/<int:id>', methods=['GET', 'POST'])
def edit_event(id):
    if 'username' not in session:
        return redirect(url_for('login'))

    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute("SELECT * FROM events WHERE id = ?", (id,))
    event = c.fetchone()

    if request.method == 'POST':
        title = request.form['title']
        date = request.form['date']
        description = request.form['description']
        
        c.execute("UPDATE events SET title = ?, date = ?, description = ? WHERE id = ?", 
                  (title, date, description, id))
        conn.commit()
        conn.close()
        
        return redirect(url_for('view_events'))

    conn.close()
    return render_template('edit_event.html', event=event)

# Delete event route
@app.route('/delete_event/<int:id>')
def delete_event(id):
    if 'username' not in session:
        return redirect(url_for('login'))

    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute("DELETE FROM events WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    
    return redirect(url_for('view_events'))

if __name__ == '__main__':
    app.run(debug=True)

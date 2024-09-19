from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=True)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    if 'username' not in session:
        return redirect(url_for('login'))
    events = Event.query.all()
    return render_template('index.html', events=events)

@app.route('/add_event', methods=['POST'])
def add_event():
    if 'username' not in session:
        return redirect(url_for('login'))
    title = request.form.get('title')
    date = request.form.get('date')
    description = request.form.get('description')
    new_event = Event(title=title, date=date, description=description)
    db.session.add(new_event)
    db.session.commit()
    flash('Event added successfully!')
    return redirect(url_for('index'))

@app.route('/edit_event/<int:id>', methods=['POST'])
def edit_event(id):
    if 'username' not in session:
        return redirect(url_for('login'))
    event = Event.query.get(id)
    event.title = request.form.get('title')
    event.date = request.form.get('date')
    event.description = request.form.get('description')
    db.session.commit()
    flash('Event updated successfully!')
    return redirect(url_for('index'))

@app.route('/delete_event/<int:id>', methods=['POST'])
def delete_event(id):
    if 'username' not in session:
        return redirect(url_for('login'))
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    flash('Event deleted successfully!')
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Simplified authentication
        if username == 'admin' and password == 'admin':
            session['username'] = username
            return redirect(url_for('index'))
        flash('Invalid credentials!')
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Registration logic would go here
        flash('Account created! You can now log in.')
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

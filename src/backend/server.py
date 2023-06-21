from flask import Flask, flash, render_template, request, session, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import mariadb
import os
import operator
from dotenv import load_dotenv
load_dotenv()

username = os.environ.get("user")
pswd = os.environ.get("password")

db = SQLAlchemy()
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://" + username + ":" + pswd + "@127.0.0.1:3306/login?charset=utf8mb4"
db.init_app(app)

class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True)
    created = db.Column(db.Date)
    upload_count = db.Column(db.Integer)
    rating_count = db.Column(db.Integer)
    uploads = db.relationship('Content', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

class Content(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)
    description = db.Column(db.String(200))
    image = db.Column(db.String(500))
    date = db.Column(db.DateTime)
    rating = db.Column(db.Integer)

    def __repr__(self):
        return '<Content %r>' % self.author


@app.route('/uploads', methods=['GET','POST'])
def uploads():
    # This will be the default for now
    db_datalist = Content.query.order_by(Content.date.desc())

    if request.method == 'POST':
        sort_data = request.get_json()
        sort_option = sort_data["value"]

        match sort_option:
            case "date-new":
                db_datalist = Content.query.order_by(Content.date.desc())

            case "date-old":
                db_datalist = Content.query.order_by(Content.date)

            case "author":
                db_datalist = Content.query.order_by(Content.author)

            case "rating":
                db_datalist = Content.query.order_by(Content.rating.desc())

            case _:
                db_datalist = Content.query.order_by(Content.date.desc())

    user_list = []
    for user in db_datalist:
        user_list.append([user.author, user.description, user.date, user.cid])

    return user_list


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        login_data = request.get_json()
        uchk = login_data["username"]
        pchk = login_data["password"]

        db_user = User.query.filter_by(username=uchk).first()
        # Checks if the user exists
        if db_user == None:
            return str(2)
        # Checks for proper username/password combination
        if uchk != db_user.username:
            return str(2)
        elif pchk != db_user.password:
            return str(2)
        else:
            return str(0)
    
    

@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        # Retrieves new login info as json
        user_info = request.get_json()
        uchk = user_info["username"]
        pchk = user_info["password"]
        echk = user_info["email"]
        # Checks if username or email is taken
        db_user = User.query.filter_by(username=uchk).first()
        db_email = User.query.filter_by(email=echk).first()
        if db_user != None and db_email != None:
            return str(3)
        else :
            new_user = User(username=uchk, password=pchk, email=echk, created=datetime.now().date(), upload_count=0, rating_count=0)
            db.session.add(new_user)
            db.session.commit()
            return str(0)
            # Creates a new account using credentials
        
@app.route('/profile', methods=['GET','POST'])
def profile():
    if request.method == 'POST':
        data = request.get_json()
        username = data["username"]
        db_user = User.query.filter_by(username=username).first()

        return [db_user.email, db_user.created, db_user.upload_count, db_user.rating_count]


if __name__ == '__main__':
    app.run(
        port=int(os.getenv('PORT',8080)),
        host=os.getenv('IP','0.0.0.0'),
        debug=True
    )
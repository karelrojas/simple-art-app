from flask import Flask, flash, render_template, request, session, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
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

class Login(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True)
    uploads = db.relationship('Content', backref='login', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

class Content(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(50), db.ForeignKey('login.username'), nullable=False)
    description = db.Column(db.String(200))
    image = db.Column(db.String(500))
    date = db.Column(db.DateTime)

    def __repr__(self):
        return '<Content %r>' % self.author

@app.route('/uploads')
def uploads():

    db_datalist = Content.query.all()
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

        db_user = Login.query.filter_by(username=uchk).first()
        if db_user == None:
            return "false"
        if uchk != db_user.username:
            return "false"
        elif pchk == db_user.password:
            return "true"
    
    return "false"

@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        # Retrieves new login info as json
        user_info == request.get_json()
        # Checks if username is taken, will update to include email
        db_user = Login.query.filter_by(username=uchk).first()
        #if user_info["username"] == db_user.username:
            # return message that says "username taken"
        

if __name__ == '__main__':
    app.run(
        port=int(os.getenv('PORT',8080)),
        host=os.getenv('IP','0.0.0.0'),
        debug=True
    )
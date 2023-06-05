
class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100)),
    email = db.Column(db.String(200), unique=True)

    def __repr__(self):
        return '<User %r>' % self.username
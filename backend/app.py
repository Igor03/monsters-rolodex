from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
import os


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# Create a monster
@app.route('/monster', methods=['POST'])
def add_monster():
    name = request.json['name']
    email = request.json['email']

    new_monster = Monster(name=name, email=email)

    db.session.add(new_monster)
    db.session.commit()

    return monster_schema.jsonify(new_monster)

# Get all monsters
@app.route('/monster', methods=['GET'])
@cross_origin()
def get_monsters():
    all_monsters = Monster.query.all()
    result = monsters_schema.dump(all_monsters)
    return jsonify(result)

@app.route('/monster/<id>', methods=['GET'])
def get_monster(id):
    monster = Monster.query.get(id)
    return monster_schema.jsonify(monster)

class Monster(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(200))

    def __init__(self, name, email):
        self.name = name
        self.email = email


# Monster Schema
class MonsterSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email')


monster_schema = MonsterSchema()
monsters_schema = MonsterSchema(many=True)


# Run server
if __name__ == '__main__':
    app.run(debug=True)
    
from flask import Flask, send_from_directory
from flask_cors import CORS
from models import db
from routes import *
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow all origins for simplicity

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Serve static files from the frontend's dist folder
frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(dist_folder, path)):
        return send_from_directory(dist_folder, path)
    else:
        return send_from_directory(dist_folder, "index.html")

# Seed default data
def seed_data():
    default_friends = [
        Friend(
            name="Tiago Roccatagliata",
            role="Backend Developer",
            description="Tiago is a backend developer passionate about solving complex problems and building robust systems. Currently working at Accenture, he leads critical projects focused on API integration and distributed database management. Known for his ability to optimize code and his eagerness to learn new technologies, Tiago also enjoys Brazilian Jiu-Jitsu and exploring cutting-edge development tools in his free time.",
            gender="male",
        ),
        Friend(
            name="Julia Delgado",
            role="Interior Design",
            description="Julia is an interior designer dedicated to creating spaces that combine functionality and aesthetics. At Contempo, she transforms offices and homes into modern and welcoming environments. Her style blends warm tones with minimalist elements, and clients admire her ability to translate their vision into reality with meticulous attention to detail.",
            gender="female",
        ),
        Friend(
            name="Francisco Mendez",
            role="Data Engineer",
            description="Francisco is a skilled data engineer with a talent for managing large datasets and designing efficient data pipelines. At Aticma, he works on projects that analyze trends and insights to drive strategic business decisions. Outside of work, Francisco is a dedicated father and enjoys experimenting with data visualization tools and techniques.",
            gender="male",
        ),
    ]
    for friend in default_friends:
        if not Friend.query.filter_by(name=friend.name).first():
            db.session.add(friend)
    db.session.commit()

# Initialize database and seed data on app startup
with app.app_context():
    db.create_all()
    seed_data()

if __name__ == "__main__":
    app.run(debug=True)
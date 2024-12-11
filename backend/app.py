import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Path al directorio "dist" del frontend
dist_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend", "dist")

# Servir archivos estáticos
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(dist_folder, path)):
        return send_from_directory(dist_folder, path)
    else:
        return send_from_directory(dist_folder, "index.html")

# Importar rutas después de inicializar `app` y `db`
from routes import *

# Crear la base de datos
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
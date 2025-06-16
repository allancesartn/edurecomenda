from models.curso import Curso

class CursoDAO:
    def __init__(self, db):
        self.db = db

    def get_all(self, area=None, nivel=None, ordem=None, sentido='desc'):
        cursor = self.db.cursor()
        query = "SELECT id, titulo, avaliacao, acessos, tempo, area, nivel FROM cursos WHERE 1=1"
        params = []
        if area:
            query += " AND area = %s"
            params.append(area)
        if nivel:
            query += " AND nivel = %s"
            params.append(nivel)
        if ordem and ordem in ["avaliacao", "acessos", "tempo"]:
            query += f" ORDER BY {ordem} {sentido.upper()}"
        else:
            query += " ORDER BY id DESC"

        cursor.execute(query, params)
        rows = cursor.fetchall()
        return [Curso(*row) for row in rows]


    def get_by_id(self, id):
        cursor = self.db.cursor()
        cursor.execute("SELECT id, titulo, avaliacao, acessos, tempo, area, nivel FROM cursos WHERE id=%s", (id,))
        row = cursor.fetchone()
        return Curso(*row) if row else None

    def create(self, curso):
        cursor = self.db.cursor()
        cursor.execute(
            "INSERT INTO cursos (titulo, avaliacao, acessos, tempo, area, nivel) VALUES (%s, %s, %s, %s, %s, %s)",
            (curso.titulo, curso.avaliacao, curso.acessos, curso.tempo, curso.area, curso.nivel)
        )
        self.db.commit()
        return cursor.lastrowid

    def update(self, id, curso):
        cursor = self.db.cursor()
        cursor.execute(
            "UPDATE cursos SET titulo=%s, avaliacao=%s, acessos=%s, tempo=%s, area=%s, nivel=%s WHERE id=%s",
            (curso.titulo, curso.avaliacao, curso.acessos, curso.tempo, curso.area, curso.nivel, id)
        )
        self.db.commit()

    def delete(self, id):
        cursor = self.db.cursor()
        cursor.execute("DELETE FROM cursos WHERE id=%s", (id,))
        self.db.commit()

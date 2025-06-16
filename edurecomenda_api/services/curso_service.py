from dao.curso_dao import CursoDAO
from models.curso import Curso

class CursoService:
    def __init__(self, curso_dao: CursoDAO):
        self.curso_dao = curso_dao

    def listar_cursos(self, area=None, nivel=None, ordem=None, sentido='desc'):
        return self.curso_dao.get_all(area, nivel, ordem, sentido)


    def obter_curso(self, id):
        return self.curso_dao.get_by_id(id)

    def criar_curso(self, data):
        curso = Curso(
            None,
            data['titulo'],
            data['avaliacao'],
            data['acessos'],
            data['tempo'],
            data['area'],
            data['nivel']
        )
        return self.curso_dao.create(curso)

    def atualizar_curso(self, id, data):
        curso = Curso(
            id,
            data['titulo'],
            data['avaliacao'],
            data['acessos'],
            data['tempo'],
            data['area'],
            data['nivel']
        )
        self.curso_dao.update(id, curso)

    def deletar_curso(self, id):
        self.curso_dao.delete(id)

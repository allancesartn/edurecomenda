
from flask import Blueprint, request, jsonify
from database.db import Database
from dao.curso_dao import CursoDAO
from services.curso_service import CursoService
from schemas.curso_schema import CursoSchema

curso_bp = Blueprint('curso_bp', __name__)
db_instance = Database.get_instance().get_connection()
curso_service = CursoService(CursoDAO(db_instance))
curso_schema = CursoSchema()
cursos_schema = CursoSchema(many=True)

@curso_bp.route('/cursos', methods=['GET'])
def listar_cursos():
    """
    Lista cursos com filtros e ordenação
    ---
    tags:
      - Cursos
    parameters:
      - name: area
        in: query
        type: string
        required: false
      - name: nivel
        in: query
        type: string
        required: false
      - name: ordem
        in: query
        type: string
        required: false
      - name: sentido
        in: query
        type: string
        required: false
    responses:
      200:
        description: Lista de cursos filtrada/ordenada
        schema:
          type: array
          items:
            $ref: '#/definitions/Curso'
    """
    area = request.args.get('area')
    nivel = request.args.get('nivel')
    ordem = request.args.get('ordem')
    sentido = request.args.get('sentido', 'desc')

    cursos = curso_service.listar_cursos(area, nivel, ordem, sentido)
    return jsonify(cursos_schema.dump(cursos)), 200


@curso_bp.route('/cursos/<int:id>', methods=['GET'])
def obter_curso(id):
    """
    Obtém um curso pelo ID
    ---
    tags:
      - Cursos
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do curso
    responses:
      200:
        description: Curso encontrado
        schema:
          $ref: '#/definitions/Curso'
      404:
        description: Curso não encontrado
    """
    curso = curso_service.obter_curso(id)
    if not curso:
        return jsonify({'error': 'Curso não encontrado'}), 404
    return jsonify(curso_schema.dump(curso)), 200

@curso_bp.route('/cursos', methods=['POST'])
def criar_curso():
    """
    Cria um novo curso
    ---
    tags:
      - Cursos
    parameters:
      - name: body
        in: body
        required: true
        schema:
          $ref: '#/definitions/Curso'
    responses:
      201:
        description: Curso criado
        schema:
          type: object
          properties:
            id:
              type: integer
      400:
        description: Dados inválidos
    """
    data = request.get_json()
    errors = curso_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    curso_id = curso_service.criar_curso(data)
    return jsonify({'id': curso_id}), 201

@curso_bp.route('/cursos/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    """
    Atualiza um curso existente
    ---
    tags:
      - Cursos
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do curso
      - name: body
        in: body
        required: true
        schema:
          $ref: '#/definitions/Curso'
    responses:
      204:
        description: Curso atualizado
      400:
        description: Dados inválidos
      404:
        description: Curso não encontrado
    """
    data = request.get_json()
    errors = curso_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    if not curso_service.obter_curso(id):
        return jsonify({'error': 'Curso não encontrado'}), 404
    curso_service.atualizar_curso(id, data)
    return '', 204

@curso_bp.route('/cursos/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    """
    Remove um curso
    ---
    tags:
      - Cursos
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do curso
    responses:
      204:
        description: Curso removido
      404:
        description: Curso não encontrado
    """
    if not curso_service.obter_curso(id):
        return jsonify({'error': 'Curso não encontrado'}), 404
    curso_service.deletar_curso(id)
    return '', 204

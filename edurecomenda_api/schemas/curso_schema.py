from marshmallow import Schema, fields

class CursoSchema(Schema):
    id = fields.Int()
    titulo = fields.Str(required=True)
    avaliacao = fields.Float(required=True)
    acessos = fields.Int(required=True)
    tempo = fields.Int(required=True)
    area = fields.Str(required=True)
    nivel = fields.Str(required=True)

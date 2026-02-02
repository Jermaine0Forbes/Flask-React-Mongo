from marshmallow import Schema, fields, validate

LoginSchema = Schema.from_dict(
    {
        "username": fields.Str(required=True, validate=validate.Length(min=3, max=20)),
        "password": fields.Str(required=True, validate=validate.Length(min=8)),
        "email": fields.Email(required=False),
    }
)
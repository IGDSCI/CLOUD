const sql = require('mssql');

module.exports = async function (context, req) {
    const id = req.query.id ? parseInt(req.query.id) : null;

    const config = {
        user: process.env['SQL_USER'], // Nome de usuário
        password: process.env['SQL_PASSWORD'], // Senha
        server: process.env['SQL_SERVER'], // Endereço do servidor
        database: process.env['SQL_DATABASE'], // Nome do banco de dados
        options: {
            encrypt: true,
            trustServerCertificate: false
        }
    };

    try {
        await sql.connect(config);
        let result;

        switch (req.method) {
            case 'POST':
                result = await sql.query`INSERT INTO usuario (name, lastName) VALUES (${req.body.name}, ${req.body.lastName}); SELECT * FROM usuario WHERE id = SCOPE_IDENTITY();`;
                context.res = {
                    status: 201,
                    body: result.recordset[0]
                };
            break;

            case 'GET':
                if (id) {
                    result = await sql.query`SELECT * FROM usuario WHERE id = ${id};`;
                    context.res = {
                        status: 200,
                        body: result.recordset[0]
                    };
                } else {
                    result = await sql.query`SELECT * FROM usuario;`;
                    context.res = {
                        status: 200,
                        body: result.recordset
                    };
                }
                break;

            case 'PUT':
                if (id) {
                    const updatedStudent = req.body;
                    result = await sql.query`UPDATE usuario SET name = ${updatedStudent.name}, lastName = ${updatedStudent.lastName} WHERE id = ${id}; SELECT * FROM usuario WHERE id = ${id};`;
                    context.res = {
                        status: 200,
                        body: result.recordset[0]
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: "ID não fornecido para atualização."
                    };
                }
                break;

            case 'DELETE':
                if (id) {
                    result = await sql.query`DELETE FROM usuario WHERE id = ${id}; SELECT * FROM usuario WHERE id = ${id};`;
                    context.res = {
                        status: 200,
                        body: result.recordset[0]
                    };
                } else {
                    context.res = {
                        status: 400,
                        body: "ID não fornecido para exclusão."
                    };
                }
                break;

            default:
                context.res = {
                    status: 405,
                    body: "Método não permitido."
                };
                break;
        }
    } catch (err) {
        context.log('Erro ao conectar ao banco de dados:', err);
        context.res = {
            status: 500,
            body: "Erro interno do servidor."
        };
    }
};
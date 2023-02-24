const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  // Configurações de conexão com o banco de dados MySQL
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
  });

  // Parâmetros para atualização do aluno
  const aluno_id = event.queryStringParameters.id;
  const nome = event.body.nome;
  const idade = event.body.idade;
  const endereco = event.body.endereco;

  // Conexão com o banco de dados MySQL
  connection.connect();

  // Consulta SQL para atualizar informações do aluno
  const sql = 'UPDATE alunos SET nome=?, idade=?, endereco=? WHERE id=?';
  const params = [nome, idade, endereco, aluno_id];
  connection.query(sql, params, function (error, results, fields) {
    if (error) {
      console.log(error);
      // Fechar a conexão com o banco de dados MySQL
      connection.end();
      // Retornar um status code 400 e informações adicionais sobre o erro
      const response = {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ocorreu um erro ao atualizar o aluno.' })
      };
      callback(null, response);
    } else {
      console.log(results);
      // Fechar a conexão com o banco de dados MySQL
      connection.end();
      // Retornar um status code 200 indicando que a atualização foi bem-sucedida
      const response = {
        statusCode: 200
      };
      callback(null, response);
    }
  });
};

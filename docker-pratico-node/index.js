const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db', //nome do service do docker-compose
    user: 'root',
    password: 'root',
    database:'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados', err);
    } else {
        console.log('Conexão estabelecida com sucesso');
    }
});

const createTableQuery = `
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.log('Erro ao criar a tabela', err);
        } else {
            console.log('Tabela criada ou já existente');
        }
    });
});

app.get('/', (req, res) => {
  const insertSql = 'INSERT INTO people (name) VALUES ("Daniel")';
  connection.query(insertSql, (insertErr) => {
      if (insertErr) {
          console.error('Erro ao inserir dados', insertErr);
          return res.status(500).send('Erro ao inserir dados');
      }

      const selectSql = 'SELECT * FROM people';
      connection.query(selectSql, (selectErr, results) => {
          if (selectErr) {
              console.error('Erro ao selecionar dados', selectErr);
              return res.status(500).send('Erro ao selecionar dados');
          }

          const listItems = results.map(person => `<li>${person.name}</li>`).join('');
          res.send(`<h1>Full Cycle Rocks!</h1><ul>${listItems}</ul>`);
      });
  });
});
app.listen(port, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});

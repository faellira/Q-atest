const Sequelize = require('sequelize');//importação do sequelize

const connection = new Sequelize('qeadatabase', 'root', '123456',{//criação do banco de dados
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection
const Sequelize = require('sequelize');//importando o Sequelize
const connection = require('./database')//importando a conexão com o bancom de dados

//codigo js para criação do model de tabela e colunas
const Question = connection.define('questions',{
    title:{
    type: Sequelize.STRING,
    allowNull : false //impede a criação se não houver valor preenchido
}, description:{
    type: Sequelize.TEXT,
    allowNull: false
}
});


Question.sync({force: false}).then(()=>{})//criando as tabelas e colunas *force false para caso já tenha uma tabela
module.exports = Question;
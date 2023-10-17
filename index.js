//Recebendo o metodo express na variável e inicializando ela no app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');//importando o body parser
const connection = require('./database/database.js')
const Questions = require('./database/Questions');
const Question = require('./database/Questions');
const Answer = require('./database/Answers');

connection
.authenticate()
.then(() =>{console.log("Conexão feita com DB")})
.catch(error => {console.log(error)})

//Dizendo ao express que o view engine utilizado sera o ejs
app.set('view engine', 'ejs');
//Dizendo ao express onde ficara os arquivos estáticos do projeto
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{ //rota a home da página
    Question.findAll({raw : true, 
        order: [['id','DESC']]}).then(questions =>{
        res.render('index',{
            questions: questions
        });
    })
    
})

app.get('/question', (req, res)=>{//rota de formulário para pergunta
    res.render('question');
})


app.post('/saveQuestion', (req, res)=>{//rota que recebe os valores de formulário
    let title = req.body.title;
    let description = req.body.description;
    
    Question.create({
        title: title, 
        description: description}).then(()=>{
            res.redirect('/');
        });
})

app.get('/answer/:id', (req, res) => {
    let id = req.params.id;

    Question.findOne({
        where: {id: id}
    }).then(questions =>{
        if(id != undefined){
            
            Answer.findAll({
                where: {questionId: questions.id},
                order: [['id', 'DESC']]
            }).then(answers =>{
                res.render('answer', {
                    questions: questions,
                    answers: answers
                })
            })   
        } else{
            res.redirect('/');
        }
    } 
    )
})


app.post('/saveAnswer', (req, res)=>{
    let questionId = req.body.questionId
    let bodyAnswer = req.body.answer

    Answer.create({
        bodyAnswer : bodyAnswer,
        questionId : questionId}).then(()=>{
        res.redirect('/answer/'+ questionId);
    })
})

app.listen(4000,(erro)=>{
    if (erro){
        console.log("Ocorreu um erro na inicialização do servidor...");
    } else{
        console.log("|Servidor inicializado com sucesso!... Porta 4000")
    }
})
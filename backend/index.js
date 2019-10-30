const express = require("express");
const app = express();
const port = 3000;
const usuarios = require('./usuarios.json');
const livros = require('./books.json');

//Middleware
app.all("*", (req, res, next) => {
    next();
});

//Rotas
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/usuarios", (req, res) => {
    res.send(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    res.send(usuarios.find(usuario => usuario.id == id));
});

app.get("/livros", (req, res) => {
    res.send(livros);
});

app.get("/livros/:id", (req, res) => {
    const id = req.params.id;
    res.send(livros.find(livro => livro.id == id));
});

app.get("/livros/:id/usuarios/:idUsuarios", (req, res) => {
    const idLivros = req.params.id;
    const idUsuarios = req.params.idUsuarios;
    const livro = livros.find(livro => livro.id == idLivros);
    const usuario = usuarios.find(usuario => usuario.id == idUsuarios);
    res.send([livro, usuario]);
});

app.get("/country", (req, res) => {
    const pais = req.query["pais"];
    const estado = req.query["estado"];
    const cidade = req.query["cidade"];
    res.send({
        "pais": pais,
        "estado": estado,
        "cidade": cidade
    });
});


//Servidor
app.listen(port, (err) => {
    if(err){
        console.log("Ocorreu um erro ao iniciar o servidor");
    }else{
        console.log(`Servidor rodando na porta ${port}`);
    };
});

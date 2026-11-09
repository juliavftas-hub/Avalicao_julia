import express from 'express'
import banco from './repository/index.js'

const app =express()
app.use(express.json());

/* isso é um post com body 
 OU SEJA é pra cadastrar alguma coisa, pelo corpo da requisição*/
app.post("/livro/cadastro", (req, res) => {
    const {id, titulo, autor} = req.body;

    if (!id || !titulo || !autor) {
        res.send({message: "cadastrar tudo"})
        return
    }

    banco.push ({id, titulo, autor})
    res.send({message:"livro criado com sucesso!"})
})

/*este é pra ser na rota POST */
app.post("/livro/cadastro/:id/:titulo/:autor", (req, res) => {
    const {id, titulo, autor} = req.params;

    if (!id || !titulo || !autor) {
        res.send({message: "cadastrar tudo"})
        return
    }

    banco.push ({id, titulo, autor})
    res.send({message:"livro criado com sucesso!"})
})
/* ISSO É UM PUT - updade
se for params, troca o nome do body e enfia depois da URL que ja tem :id/:titulo assim por diante*/
app.put("/livro/update", (req, res) => {
    const{ id, titulo, autor} = req.body;

    const index = banco.findIndex(p=> p.id==id)

    if(index ==-1){
        res.send({message:"id não encontrado!"})
        return
    }

    banco[index].titulo = titulo;
    banco[index].autor = autor;

    res.send ({message: "livro atualizado com sucesso!"})
})

// Esse GET pega todos os livros cadstrados
app.get("/livro", (req, res) => {
    res.json(banco)
})
 
/* Esse GET pega o id preenchido na URL,
podendo pegar pelo Body utilisando Const id = req.body.id
e alterando a rota para /livros/busca*/
app.get("/livro/:id", (req, res) => {
    const id = req.params.id
 
    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }
 
    const livro = banco.find(p => p.id == id)
 
    if(!livro){
        res.send({message: "Id não encontrado!"})
        return
    }
 
 
    res.send({message: livro})
 
})
 
// DELETE com os dados do livro na URL Exemplo /livro/1
/*app.delete("/livro/:id", (req, res) => {
    const id = req.params.id
 
    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }
 
    // buscar pelo id, pra achar aposisao no array
    const index = banco.findIndex(p => p.id == id)
 
    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return
    }
})*/
 
// DELETE com os dados do livro no corpo
app.delete("/livro/delete", (req, res) => {
    const id = req.body.id
 
    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }

    // buscar pelo id, pra achar aposisao no array
    const index = banco.findIndex(p => p.id == id)
 
    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return
    }
    banco.splice(index, 1)
 
    res.send({message: "livro removido"})
 
})

app.listen(3000, () =>{
    console.log("servidor rodando na porta 3000")
})


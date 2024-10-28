//Imports
import * as express from 'express';
const app = express();
//Puerto
const PORT = 3000;
//Middlewares
let usuarios = [
    {
     id: 1,
     name : "usuario 1",
     ocupacion : "programador"
    },{
    id: 2,
    name : "usuario 2",
    ocupacion : "programador2"
    }
    ,{id: 3,
    name : "usuario 3",
    ocupacion : "programador3"
    },
    {id: 4,
    name : "usuario 4",
    ocupacion : "programador4"
    },
    {id: 5,
    name : "usuario 5",
    ocupacion : "programador5"
    },
    {id: 6,
     name : "usuario 6",
    ocupacion : "programador6"
    }
];
let productos = [
    {
     id: 1,
     name : "productos 1",
     sku : 1234
    },{
    id: 2,
    name : "productos 2",
    sku : 12345
    }
    ,{id: 3,
    name : "productos 3",
    sku : 12346
    },
    {id: 4,
    name : "productos 4",
    sku : 12347
    },
    {id: 5,
    name : "productos 5",
    sku : 12348
    },
    {id: 6,
     name : "productos 6",
     sku : 12349
    }
];

//SIEMPRE PONER EL MIDDLEWARE
app.use(express.json());
app.get('/', (req, res) =>{
    res.send('Hola mundo');
})
app.get('/users', (req, res) =>{
    res.json(usuarios);
})
app.get('/users/:id', (req,res)=>{
    const usuario = parseInt(req.params.id)
    const respuesta = usuarios.find(elemento => elemento.id == usuario)
    res.send(respuesta)
})

app.post('/users', (req, res) =>{
    console.log(req.body)
   const nuevoUsuario = req.body;
   const nuevoId = usuarios.length + 1;
   const usuarioCompleto = {id:nuevoId, ...nuevoUsuario};
   usuarios.push(usuarioCompleto);
   res.send(usuarios)
})
//LOS : son para obtener el dato y el REQ.params capta ese valor
app.put('/users/:id', (req, res) => {
    const modificarUsuario = req.body;
    console.log('hoila?')
    for(let i = 0 ; i < usuarios.length; i++){
        console.log('Ingresa?', i)
        if(parseInt(req.params.id) === usuarios[i].id){
            console.log("Se modifico usuario[i]", usuarios[i]);
            usuarios[i] = { ...usuarios[i], ...req.body };
            res.json(usuarios[i]);
            console.log("Se modifico por el siguiente: ", usuarios[i]);
            
        }
    }
})
app.delete('/users/:id', (req,res) =>{
    const idDelete = parseInt(req.params.id);
    const arrayFiltrado = usuarios.filter(element => element.id != idDelete);
    console.log("Array Filtrado: ", arrayFiltrado);
    usuarios = arrayFiltrado;
    res.json(usuarios);
})
//PRODUCTOS

app.get('/productos/', (req,res) => {
    res.json(productos)
})

app.get('/productos/:id', (req,res) =>{
    const producto = parseInt(req.params.id)
    const respuesta = productos.find(elemento => elemento.id == producto);
    res.json(respuesta)
})
app.post('/productos/', (req,res) =>{
    productos = [...productos, req.body];
    res.json(productos)
})
app.put('/productos/:id', (req,res) =>{
    const prodBuscado = parseInt(req.params.id);
    for(let i = 0 ; i < productos.length; i++){
        if(productos[i].id === prodBuscado){
            productos[i] = { ...productos[i] , ...req.body }
        }
    }
    res.json(productos);
})

app.delete('/productos/:id', (req,res) =>{
    const prodBuscado = parseInt(req.params.id);
    const arrayFiltrado = productos.filter(element => element.id != prodBuscado);
    productos = arrayFiltrado;
    res.json(productos)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});
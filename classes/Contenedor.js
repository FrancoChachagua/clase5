const fs = require('fs');
const getRandomUid = require('../utils');
const makeId = require('../utils')

class Contenedor{
    async save(prod){
        try {
            let data = await fs.promises.readFile('./files/productos.txt','utf-8')
            let productList = JSON.parse(data);
            if(productList.some(evt=>evt.title===prod.title)){
                return console.log("Ya has realizado este pedido");
            }else{
                let dataObj = {
                    id:makeId(productList),
                    title: prod.title,
                    price: prod.price,
                    thumbnail: prod.thumbnail
                }
                productList.push(dataObj);
                try{
                    let thisId = `Id: ${dataObj.id}`
                    await fs.promises.writeFile('./files/productos.txt',JSON.stringify(productList,null,2));
                    return {message:"Pedido creado", id:thisId}
                } catch(error) {
                    return {err: `No se pudo crear el pedido`}
                }
            }
        } catch {
            let dataObj = {
                id:1,
                title: prod.title,
                price: prod.price,
                thumbnail: prod.thumbnail
            }
            try {
                let thisId = `Id: ${dataObj.id}`
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify([dataObj], null, 2));
                return {message:"Pedido creado con exito", id:thisId }
            }catch(error){
                return console.log(`No se pudo crear el pedido !`);
            }
        }
    }
    async getById(id){
        try {
            let data = await fs.promises.readFile('./files/productos.txt' , 'utf-8')
            let productList = JSON.parse(data);
            let object = productList.find(evt => evt.id === id);
            if (object) {
                return {object:object}
            }else{
                return {object:null}
            }
        } catch (error) {
            return console.log(`No se encontro el pedido `);
        }
    }
    async getAll(){
        try {
            let data = await fs.promises.readFile('./files/productos.txt','utf-8')
            let productList = JSON.parse(data);
            if (productList.length === 0) {
                return {products:`Data esta vacio! Primero debes ingresar un pedido!`};
            } else {
                return {products:productList};
            }
        } catch (error) {
            return console.log(`El archivo no existe!`);
        }
    }
    async deleteById(id){
        try {
            let data = await fs.promises.readFile('./files/productos.txt' , 'utf-8')
            let productList = JSON.parse(data);
            let pDelete = productList.filter(function(prod) {
                return prod.id !== id; 
            });
            fs.writeFileSync('./files/productos.txt', JSON.stringify(pDelete, null, 2));

        } catch (error) {
            return console.log("No existe un pedido con el id seleccionado, prueba con otro!");
        }
    }
    async deleteAll(){
        let data = await fs.promises.readFile('./files/productos.txt' , 'utf-8')
        let productList = JSON.parse(data);
        productList = ''
        fs.writeFileSync('./files/productos.txt', JSON.stringify(productList, null, 2))
    }
    async randomId(){
        try {
            let data = await fs.promises.readFile('./files/productos.txt' , 'utf-8')
            let productList = JSON.parse(data);
            let mapUid = productList.map(({id})=> id);
            let index = getRandomUid(1, mapUid.length)
            let object = productList.find(prd => prd.id === index);
            return {product:object}
        } catch (error) {
            return {product:`No hay productos!`}
        }
    }
}

module.exports = Contenedor;

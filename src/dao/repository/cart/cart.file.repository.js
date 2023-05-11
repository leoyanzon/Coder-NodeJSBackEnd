const ProductDTO = require('../../dto/product.dto');
const { logger } = require('../../../services/logger');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

class CartFileRepository {
    constructor(_nombreArchivo){
        this.ruta = `./${_nombreArchivo}.txt`
        this.createFile();
    }

    static getInstance(_nombreArchivo){
        if (!this.instance){
            this.instance = new CartFileRepository(_nombreArchivo);
            logger.info(`Cart Repository: File ${this.instance.ruta} used`);
        }

        return this.instance
    }

    async createFile(){
        try{
            const exists = fs.existsSync(this.ruta);
            if (!exists) {
                await fs.promises.writeFile(this.ruta, "");
                logger.info(`Cart Repository: File ${this.ruta} created`)
            }
        } catch (err) {
            logger.error(`Cart Repository: Error creating file:${err.message}`)
        }
    }
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data = []
                return data;
            } else {
                let data = JSON.parse(contenido);
                return data;
            }
        } catch (err){
            logger.error(`Cart Repository: getAll() error:${err.message}`);
        }
    }
    async save(productData){
        try{
            const objetosExistentes = await this.getAll();
            const _id = uuidv4();
            const productDTO = await new ProductDTO(productData);

            objetosExistentes.push({...productDTO, _id:_id});

            const data = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return _id
        } catch (err){
            logger.error(`Cart Repository: save() error:${err.message}`);
        }
    }
    async getById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const [ query ] = objetosExistentes.filter(it => it._id === _id)
            return query;
        } catch(err) {
            logger.error(`Cart Repository: getById() error ${err.message}`);
        }
    }
    async deleteById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const data = JSON.stringify(objetosExistentes.filter(it => it._id != _id));
            await fs.promises.writeFile(this.ruta, data);
            return _id;
        } catch(err) {
            logger.error(`Cart Repository: deleteById() error ${err.message}`);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch(err) {
            logger.error(`Cart Repository: deleteAll() error ${err.message}`);
        }
    }
}

module.exports = CartFileRepository;
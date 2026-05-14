const app = require('./app');
const PORT = process.env.PORT || 3000;
const db = require('./config/db.config')

const router = require('../src/routes/producto.route');




const server = async ()=>{

    try {
        await db.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        app.use('/api/productos', router);
        app.listen(PORT, () => {    
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor', error);
    }


}



server();
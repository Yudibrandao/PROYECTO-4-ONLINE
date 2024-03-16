import app from './app';
import { dataSource } from './database/data-source';

const PORT = process.env.PORT || 3000;


dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => console.log(`Servidor ejecutandose en el puerto ${PORT}`));
        console.log(`Se ha inicializado la conexion con la base de datos`);
    })
    .catch((error) => {
     console.error(error);
     process.exit(1);
    });   


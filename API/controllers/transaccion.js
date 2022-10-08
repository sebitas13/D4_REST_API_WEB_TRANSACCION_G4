const { MongoClient } = require('mongodb');
require('dotenv').config();


const transaccion = async (email,equipo,monto) =>{

    const uri = process.env.MONGODB_URI;

    const cliente = new MongoClient(uri);

    try {
        // Conexion al cluster de MongoDB
        await cliente.connect();


       const apuesta = await crearApuesta(cliente,
            email,
            equipo, //Equipo
            monto); //Monto

          return apuesta;  
    } catch (error) {
        console.log('erro: '+error);
    
    }finally {
        
        await cliente.close();
    }
}


async function crearApuesta(cliente, userEmail,nombreEquipo, monto) {

    const usuarios = cliente.db("BD4").collection("usuarios");

  
    const equipos = cliente.db("BD4").collection("equipos");

    // Documento de reserva que se agrega para los usarios.
    const apuesta = crearDocumentoApuesta(nombreEquipo, monto);

    // Inicio de la sesion del cliente
    const session = cliente.startSession();

    //Opciones para la transaccion | opcional
    const opcionesTransaccion = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        
        const resultadoTransaccion = await session.withTransaction(async () => {


            const usuariosActualizados = await usuarios.updateOne(
                { email: userEmail },
                { $push: { apuestas: apuesta } },  //agrega un valor a una matriz
                { session });

            console.log(`${usuariosActualizados.matchedCount} usuarios encontrados en la colección con la dirección de correo electrónico ${userEmail}.`);
            console.log(`${usuariosActualizados.modifiedCount} documento usuario actualizado con la apuesta.`);

            //  Agregue las fechas de reserva a la matriz de fechas reservadas para el documento apropiado en la colección de apuestas
            const equipoActualizado = await equipos.updateOne(
                { nombre: nombreEquipo },
                { $push: { montosApuestas: monto} }, //operador para agregar varios valores a una matriz
                { session });
            console.log(`${equipoActualizado.matchedCount} documento encontrado en la colección apuestas con el nombre ${nombreEquipo}.`);
            console.log(`${equipoActualizado.modifiedCount} el documento fue actualizado para incluir las apuestas.`);

        }, opcionesTransaccion);


        if (resultadoTransaccion) {
            console.log("La apuesta fue creada con éxito.");
            return resultadoTransaccion;
        } else {
            console.log("La transacción fue abortada intencionalmente.");
        }
    } catch (e) {
        console.log("La transacción fue abortada debido a un error inesperado: " + e);
    } finally {
       
        await session.endSession();
    }


}


function crearDocumentoApuesta(nombreEquipo, monto) {
    
    let apuesta = {
        nombreEquipo: nombreEquipo,
        monto: monto,
    }
    

    return apuesta;
}


module.exports = {
    transaccion
}

const equipoSchema = require('../modelo/equipo');
const {transaccion} = require('./transaccion');


const getEquipos =  async (req,res) =>{

  try {
    const equipos = await equipoSchema.find();
    res.status(200).json({data:equipos});
  } catch (error) {
    res.status(200).json({message:error});
  }
  

    // equipoSchema
    // .find()
    // .then((data)=> res.json(data))
    // .catch((err)=>res.json({message:error}));
};

const createEquipo = async (req, res) => {

  try {
    const equipo = equipoSchema(req.body);
    const equipoCreated = await equipo.save();
    console.log(equipoCreated);
    res.status(200).json({data:equipoCreated});
  } catch (error) {
    res.status(200).json({message:error});
  }

    // console.log(req.body);
    // const equipo = equipoSchema(req.body); 
    // equipo.save()
    // .then((data) => res.json(data))
    // .catch((error)=> res.json({message:error}));
  }

  const findEquipo = async (req,res) => {
    try {
      const {id} = req.params;
      const equipo = await equipoSchema.findById(id);
      console.log(equipo);
      res.status(200).json({data:equipo});
    } catch (error) {
      res.status(200).json({message:error});
    }
    // const {id} = req.params;
    // equipoSchema
    // .findById(id) 
    // .then((data) => res.json(data))
    // .catch((error)=> res.json({message:error}));
  }

  const updateEquipo = async (req,res) => {

    try {
      const {id} = req.params;
      const {nombre,entrenador,logo} = req.body;
      const  equipoUpdate = await equipoSchema.updateOne(
        {_id:id},
        {$set:{nombre,entrenador,logo}}
      )
      console.log(equipoUpdate);
      res.status(200).json({data:equipoUpdate})
    } catch (error) {
      res.status(200).json({message:error,data : undefined})
    }


    // const {id} = req.params;
    // const {nombre,entrenador,logo} = req.body;
    // equipoSchema
    // .updateOne(
    //   {_id:id},
    //   {$set:{nombre,entrenador,logo}}
    //   )
    // .then((data)=>res.json(data))
    // .catch((error) => res.json({message:error}));

  }

  const deleteEquipo = async (req,res) => {

    try {
      const {id} = req.params;
      const equipoDeleted = await equipoSchema.deleteOne(
        {_id:id}
      );
      console.log(equipoDeleted);
      res.status(200).json({data:equipoDeleted});
    } catch (error) {
      res.status(200).json({message:error});
    }

    // const {id} = req.params;
    // equipoSchema
    // .deleteOne(
    //   {_id:id}
    // )
    // .then((data)=>res.json(data))
    // .catch((error)=>res.json({messasge:error}));
  }


  

  const updateApuesta = async (req,res) => {
  
    try {
      const {email,equipo,monto} = req.body;
      console.log(req.body);
      const nuevaApuesta = await transaccion(email,equipo,monto);
      console.log(nuevaApuesta);
      res.status(200).json({data:nuevaApuesta});
    } catch (error) {
      res.status(200).json({message:error});
    }
    
    

  }


module.exports = {
    getEquipos,
    createEquipo,
    deleteEquipo,
    findEquipo,
    updateEquipo,
    updateApuesta
}

const equipoSchema = require('../modelo/equipo');
const {transaccion} = require('./transaccion');


const getEquipos = (req,res) =>{
    equipoSchema
    .find()
    .then((data)=> res.json(data))
    .catch((err)=>res.json({message:error}));
};

const createEquipo = (req, res) => {
    console.log(req.body);
    const equipo = equipoSchema(req.body); 
    equipo.save()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error}));
  }

  const updateEquipo = (req,res) => {
  
    const {id} = req.params;
    const {nombre,entrenador,logo} = req.body;
    equipoSchema
    .updateOne(
      {_id:id},
      {$set:{nombre,entrenador,logo}}
      )
    .then((data)=>res.json(data))
    .catch((error) => res.json({message:error}));

  }

  const deleteEquipo = (req,res) => {
    const {id} = req.params;
    equipoSchema
    .deleteOne(
      {_id:id}
    )
    .then((data)=>res.json(data))
    .catch((error)=>res.json({messasge:error}));
  }


  const findEquipo = (req,res) => {
    const {id} = req.params;
    equipoSchema
    .findById(id) 
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error}));
  }

  const updateApuesta = (req,res) => {
  
    //const {id} = req.params;
    const {email,equipo,monto} = req.body;
    console.log(req.body);
    transaccion(email,equipo,monto);
    // equipoSchema
    // .updateOne(
    //   {_id:id},
    //   {$set:{nombre,entrenador,logo}}
    //   )
    // .then((data)=>res.json(data))
    // .catch((error) => res.json({message:error}));

  }


module.exports = {
    getEquipos,
    createEquipo,
    deleteEquipo,
    findEquipo,
    updateEquipo,
    updateApuesta
}
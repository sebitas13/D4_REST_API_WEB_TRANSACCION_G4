const mongoose = require('mongoose');



const equipoSchema = mongoose.Schema({
    nombre : {
        type : String , required:true,
    },
    entrenador : {
        type : String , required:true,
    },
    logo : {
        type: String , required : true
    }
});



module.exports =  mongoose.model('equipo',equipoSchema);



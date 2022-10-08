
const User = require('../modelo/user');
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
const saltRounds =  10;


const registro_usuario = async function(req,res) {
    var {username,password} = req.body; //desestructuramos el body
    var usuarios_arr = []; //creamos un array para almacenar los usuarios

    usuarios_arr = await User.find({username:username}); //buscamos en si ya exuste en la bd el username

    //validamos si ya existe el username en la base de datos
    if(usuarios_arr.length==0){
        
        //comprobamos si hay password
        if(password){
            bcrypt.hash(password,saltRounds,async function(err,hash){
                if(hash){
                    //console.log(hash);
                    password = hash;
                    const usuario = {
                        username : username,
                        password : password
                    }
                    //creamos el usuario con el password encriptado
                    var reg = await User.create(usuario);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({mensaje:'Error server hash',data:undefined});
                }
            })
        }else{
            res.status(200).send({mensaje:'No hay una contraseña'});
        }
        
    
    }else{
        res.status(200).send({mensaje:'el correo ya existe en el DB',data:undefined});
    }

    
}


const login_usuario = async function(req,res) {

    var {username,password} = req.body; //desestructuramos el body
    var usuarios_arr = []; //creamos un array para almacenar los usuarios

    usuarios_arr = await User.find({username:username});

    if(usuarios_arr==0){
        res.status(200).send({message:'No se encuentra el usuario',data:undefined});
    }else{
        //Si se encuentra el usuario
        let user = usuarios_arr[0];

        bcrypt.compare(password,user.password,async function(error,check){
            if(check){
                res.status(200).send({data:user, token: jwt.createToken(user)});
            }else{
                res.status(200).send({message:'La contraseña no concide',data:undefined});
            }
        })

     
    }

    
}

module.exports = {
    registro_usuario : registro_usuario,
    login_usuario : login_usuario

}
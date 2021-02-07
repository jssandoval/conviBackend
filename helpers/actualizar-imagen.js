const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = (path) => {
    if (fs.existsSync(path)){
        //borrar la Imagen anterior
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = ''; 
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico){
                console.log('No es un medico valido (o id)');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            //borrar imagen anterior
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital){
                console.log('No es un hospital valido (o id)');
                return false;
            }

            pathViejo = `./uploads/hospital/${ hospital.img }`;
            //borrar imagen anterior
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario){
                console.log('No es un usuario valido (o id)');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            //borrar imagen anterior
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await  usuario.save();
            return true;
    }    
};

module.exports = {
    actualizarImagen
};
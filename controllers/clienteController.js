const Cliente = require('../models/Cliente');


//funcion agregar clientes

exports.agregarClientes = async(req, res) =>{
    try {
        
        let clientes;
        clientes = new Cliente(req.body)
        await clientes.save();
res.json(clientes);



    } catch (error) {
        
    console.log(error)
    res.status(500).send('hubo un error al agregar un cliente');
    }
}

// fucion buscar cliente s

exports.mostrarClientes = async(req, res) =>{
    try {
        const clientes = await Cliente.find();
        res.json(clientes);

    } catch (error) {
        console.log(error)
       res.status(500).send('hubo un error al mostrar los cliente');
        
    }


}

//buscar un cliente

exports.BuscarCliente = async (req,res) =>{4
    try {
        
let clientes = await Cliente.findById(req.params.id)
if(!clientes){
    res.status(404).send({msg:"el cliente no se encuentra por id"});

}else{
res.json(clientes);
}
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al buscar el cliente');
        
    }
    }

    //funcion modificar clientes con metodo put

    exports.actualizarClientes = async(req, res) => {
      try {
        
      const {nombres, apellidos, documento, correo, telefono, direccion} = req.body
      let cliente = await Cliente.findById(req.params.id);
      
      if(!cliente){
        res.status(404).json({msg: "el cliente no existe"});
        return
      }
       cliente.nombres = nombres;
       cliente.apellidos = apellidos;
       cliente.documento = documento;
       cliente.correo = correo;
       cliente.telefono = telefono;
       cliente. direccion = direccion;

       cliente = await Cliente.findOneAndUpdate({_id: req.params.id}, cliente,{new:true});
       res.json(cliente);

      } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al actualizar el cliente');
      }
    }

    
// funcion eliminar clientes

    exports.eliminarClientes = async(req, res) =>{
        try {
          let clientes = await Cliente.findById({_id: req.params.id});
          if(!clientes){
            res.status(404).send("el cliente no existe");
            return
          }  
          await Cliente.findOneAndDelete({_id: req.params.id})
          res.json({msg:"El cliente fue eliminado con exito"});
          return
        
        } catch (error) {
            console.log(error)
            res.status(500) .send('hubo un error al eliminar un cliente');
   
        }
    }
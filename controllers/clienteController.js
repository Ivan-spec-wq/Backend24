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

    exports.modificarClientes = async (req, res) =>{
      try {
        
      const clientes = await Cliente.findOneAndUpDate({_id: req.params.id}, req.body, {new:true});
      if(!clientes) {
          res.status(404).send("cliente no encontrado");

      }else 
          res.json(clientes);
        

      } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al editar el cliente');
      }
    }

    //funcion edita utilizando patch

    exports.editarClientes = async(req, res) =>{
        try {
            const clientes = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if(!clientes){
                return res.status(400).send("cliente no existe");
            }
             res.json(clientes);

        } catch (error) {
         console.log(error)
         res.status(500) .send('hubo un error al edita un cliente');

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
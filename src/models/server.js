const express = require('express');
const path = require('path')
const cors = require('cors');
const http = require('http');
const dbConnection = require('../database/config');


class Server {
  constructor() {
    this.app = express();
    this.port = 3000;

    this.paths =  {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      permisos: '/api/permisos',
      roles: '/api/roles',
      rolesPermisos: '/api/rolesPermisos',
      usuariosRoles: '/api/usuariosRoles',
      rutas: '/api/rutas',
      rutaUsuarios: '/api/rutaUsuarios',
      configuraciones: '/api/configuraciones',
      clientes: '/api/clientes',
      planneds: '/api/planneds',
      visitas: '/api/visitas'
    }
      // conectar a base de datos
      this.conectarDB();
      //Middlewares
      this.middlewares();
      //Rutas de la aplicacion
      this.routes();
  }

  async conectarDB() {
    await dbConnection(); 
  } 

  

  middlewares() {
    //CORS
    this.app.use(cors());
    //lectura y parseo del body
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static('public'));
}

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.route'));
    this.app.use(this.paths.usuarios, require('../routes/usuarios.route'));
    this.app.use(this.paths.permisos, require('../routes/permisos.route'));
    this.app.use(this.paths.roles, require('../routes/roles.route'));
    this.app.use(this.paths.rolesPermisos, require('../routes/roles-permisos.route'));
    this.app.use(this.paths.usuariosRoles, require('../routes/usuarios-roles.route'));
    this.app.use(this.paths.rutas, require('../routes/ruta.route'));
    this.app.use(this.paths.rutaUsuarios, require('../routes/rutas-usuarios.route'));
    this.app.use(this.paths.configuraciones, require('../routes/configuracion.route'));
    this.app.use(this.paths.clientes, require('../routes/clientes.route'));
    this.app.use(this.paths.planneds, require('../routes/planned.route'));
    this.app.use(this.paths.visitas, require('../routes/visita.route'));
  }

  listen() {
    this.app.listen(this.port, ()=> {
        console.log('Servidor corriendo en puerto', this.port);
    });
  }
}


module.exports = Server;
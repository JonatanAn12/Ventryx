/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import  InventoryController  from '../app/controllers/inventorys_controller.js'
import  AuthController  from '../app/controllers/login_controller.js'
import { middleware } from '#start/kernel'
import registersController from '../app/controllers/registers_controller.js'


router.get('/api/v1/inventario', ([InventoryController, "index"]))

router.get('/api/v1/inventario/:id', ([InventoryController, "show"]))

router.post('/api/v1/inventario', ([InventoryController, "create"]))

router.put('/api/v1/inventario/:id', ([InventoryController, "update"]))

router.delete('/api/v1/inventario/:id', ([InventoryController, "destroy"]))

router.post('/api/v1/login', ([AuthController, "login"]))

router.post('/api/v1/register', ([registersController, "register"]))
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const multer  = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images')
    },
    filename: (req, file, cb) =>{
      cb(null, Date.now()+'-'+file.originalname)
    }
  })

const upload = multer({storage: fileStorage})


router.get('/', Controller.showRestaurant)
router.get('/restaurant', Controller.showRestaurant)
router.get('/restaurant/add', Controller.addRestaurantGet)
router.post('/restaurant/add', Controller.addRestaurantPost)
router.get('/restaurant/edit/:id', Controller.editRestaurantGet)
router.post('/restaurant/edit/:id', Controller.editRestaurantPost)
router.get('/restaurant/delete/:id', Controller.deleteRestaurant)
router.get('/food', Controller.showFood)
router.get('/food/add', Controller.addFoodGet)
router.post('/food/add', Controller.addFoodPost)
router.get('/food/edit/:id', Controller.editFoodGet)
router.post('/food/edit/:id', Controller.editFoodPost)
router.get('/food/delete/:id', Controller.deleteFood)
router.get('/restaurant/addFood/:id', Controller.addRestaurantFoodGet)
router.post('/restaurant/addFood/:id', upload.single('images'), Controller.addRestaurantFoodPost)
router.get('/restaurant/food/:id', Controller.showRestaurantFood )
router.get('/food/restaurant/:id', Controller.showFoodRestaurant)
router.get('/restaurant/maps/:id', Controller.showRestaurantMaps)


module.exports = router
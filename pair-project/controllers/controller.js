const { Restaurant, Food, RestaurantFood } = require("../models")
const toRupiah = require('../helpers/toRupiah')
class Controller{

    
    static showRestaurant(req, res){
        let list = []
        console.log('masuk controller')
        Restaurant.findAll()
        .then(data => {
            res.render('restaurants.ejs', {
                data
            })
        })
        .catch(err => res.send(err))
    }
   

    static addRestaurantGet(req, res){
        res.render('addRestaurant.ejs')
    }

    static addRestaurantPost(req, res){
        const { restaurant_name, restaurant_address, restaurant_type } = req.body
        
        Restaurant.create({ restaurant_name, restaurant_address, restaurant_type,  createdAt: new Date(), updatedAt: new Date() })
        .then(_ => res.redirect('/'))
        .catch(err => res.send(err.errors[0].message))
    }

    static editRestaurantGet(req, res){
        const id = +req.params.id
        let ph = null
        
        
        Restaurant.findByPk(id)
        .then(data=> {
            
            res.render('editRestaurant.ejs', {
                data
            })
        })
        .catch(err => res.send(err))
    }

    static editRestaurantPost(req, res){
        const id = +req.params.id
        const {restaurant_name, restaurant_address, restaurant_type } = req.body

        Restaurant.update({restaurant_name, restaurant_address, restaurant_type, createdAt: new Date(), updatedAt: new Date() }, {
            where: {
              id
            }
          })
        .then(_ => res.redirect('/'))
        .catch(err => res.send(err))
        
    }

    static deleteRestaurant(req, res){
        const id = +req.params.id
        Restaurant.destroy({
            where: {
              id: id
            }
        })
        .then(_ => res.redirect('/'))
        .catch(err => res.send(err))
        
    }

    static showFood(req, res){
        Food.findAll()
        .then(data => {
            res.render('food.ejs', {
                data
            })
        })
        .catch(err => res.send(err))
    }

    static addFoodGet(req, res){
        res.render('addFood.ejs')
    }

    static addFoodPost(req, res){
        const { food_name } = req.body
        
        Food.create({ food_name, createdAt: new Date(), updatedAt: new Date() })
        .then(_ => res.redirect('/food'))
        .catch(err => res.send(err))
    }

    static deleteFood(req, res){
        const id = +req.params.id
        Food.destroy({
            where: {
              id: id
            }
        })
        .then(_ => res.redirect('/food'))
        .catch(err => res.send(err))
        
    }

    static editFoodGet(req, res){
        const id = +req.params.id
        
        Food.findByPk(id)
        .then(data => {
            res.render('editFood.ejs', {
                data
            })
        })
        .catch(err => res.send(err))
    }

    static editFoodPost(req, res){
        const id = +req.params.id
        const { food_name} = req.body
        Food.update({food_name, createdAt: new Date(), updatedAt: new Date() }, {
            where: {
              id
            }
          })
        .then(_ => res.redirect('/food'))
        .catch(err => res.send(err))
        
    }

    static addRestaurantFoodGet(req, res){
        const id = +req.params.id
        let foodList = []
      

        Food.findAll()
        .then(data => {
            data.forEach(item =>{
                foodList.push(item)
            })
        })
        .catch(err => res.send(err))


        Restaurant.findByPk(id)
        .then(data => {
            console.log(data, "<<<< ini data \n")
            res.render('addRestaurantFood.ejs', {
                data,
                foodList
                
            })
            
        })
        .catch(err => {
            res.send(err)
            console.log("ini error 3")
            
        })
    
    }

    static addRestaurantFoodPost(req, res){
        const id = +req.params.id
        const { FoodId, price } = req.body
        console.log(req.body)
        RestaurantFood.create({price, createdAt: new Date(), updatedAt: new Date(), FoodId, RestaurantId:id })
        .then(_ => {
            res.redirect(`/restaurant/food/${id}`)
        })
        .catch(err => res.send(err.errors[0].message))
        
    }

    static showRestaurantFood(req, res){
        const id = +req.params.id
        let priceList = []

        RestaurantFood.findAll({
            where:{
                RestaurantId: id
            }
        })
        .then(data => {
            data.forEach(item =>{
                priceList.push(item)
            })
        })
        .catch(err => res.send(err))

        Restaurant.findByPk(id, {
            include: [Food]
        })
        .then(data => {
            res.render('restaurantFood.ejs', {
                data,
                priceList,
                toRupiah
            })
        })
        .catch(err => {
            res.send(err)
            console.log(err, "<<<< ini error")
        })

        
    }
    
    static showFoodRestaurant(req, res){
        const id = +req.params.id
        let priceList = []

        RestaurantFood.findAll({
            where:{
                FoodId: id
            }
        })
        .then(data => {
            console.log(data)
            data.forEach(item =>{
                priceList.push(item)
            })
        })
        .catch(err => res.send(err))

        Food.findByPk(id, {
            include: [Restaurant]
        })
        .then(data => {
            res.render('foodRestaurant.ejs', {
                data,
                priceList
            })
        })
        .catch(err => {
            res.send(err)
            console.log(err, "<<<< ini error")
        })


    }

    static showRestaurantMaps(req, res){
        console.log("sampai controller")
        res.render('maps.ejs')
    }
    
}

module.exports = Controller
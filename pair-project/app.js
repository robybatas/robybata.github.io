const express = require('express')
const app = express()
const multer  = require('multer')
const port = 3000
const router = require('./routes/index.js')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) =>{
    cb(null, new Date().getTime()+'-'+file.originalname)
  }
})

// const fileFilter = (req, file, cb) =>{
//   if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//     cb(null, true)
//   }else{
//     cb(null, false)
//   }
// }

app.use(multer({storage: fileStorage}).single('images'))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(port, ()=>{
    console.log('running on port', port)
})




/**
 *  npx sequelize model:generate --name ProductionHouse --atributes name_prodHouse:string,headquarter:string
 * npx sequelize model:generate --name Movie --attributes name:string,released_year:integer,genre:string,name_prodHouse:string
 * 
 * references: {
          model: {
            tableName: 'Pokemons'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
 */

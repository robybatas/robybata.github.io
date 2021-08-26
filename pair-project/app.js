const express = require('express')
const app = express()
const port = 3006
const router = require('./routes/index.js')
const session = require('express-session')


app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'hacktivood',
  resave: false,
  saveUninitialized: true
}))

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

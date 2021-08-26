'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    jalan(){
      return `Jl. ${this.restaurant_address}`
    }


    static associate(models) {
      // define association here
      Restaurant.belongsToMany(models.Food, {through: 'RestaurantFoods'})
    }
  };
  Restaurant.init({
    restaurant_name: DataTypes.STRING,
    restaurant_address: DataTypes.STRING,
    restaurant_type: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (instance, options) => {
          let str = instance.restaurant_address
          if(str.slice(0,3)=="Jl." || str.slice(0,3)=="jl."){
            instance.restaurant_address = str.slice(3)
          }
        }
      },
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
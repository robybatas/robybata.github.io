'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const fs = require('fs')
     const data = JSON.parse(fs.readFileSync('./foods.json'))
     data.forEach(item =>{
       item.createdAt = new Date()
       item.updatedAt = new Date()
     })
       return queryInterface.bulkInsert('Food', data)
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Food', null)
  }
};

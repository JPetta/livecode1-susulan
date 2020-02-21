'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Trips', [
      {
        title: "Trip to Tanah Lot",
        location: "Bali",
        date: new Date('2007-02-24T11:48:04.998Z')
      },
      {
        title: "Trip to Candi Borobudur",
        location: "Magelang",
        date: new Date('2015-03-17T14:55:40.120Z')
      },
      {
        title: "Trip to Seminyak",
        location: "Bali",
        date: new Date('2008-06-01T21:23:36.291Z')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Trips', null, {});
  }
};

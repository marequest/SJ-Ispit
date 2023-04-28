'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        name: "Marko",
        password: "$2b$10$2.aD3XXi7HH7v4Fgr1x2h.I30WFV1ZyI9D6t4Y7wLijgWjOhO19py",
        admin: true,
        email: "marequest123@gmail.com"
      },{
        name: "Nikola",
        password: "$2b$10$2.aD3XXi7HH7v4Fgr1x2h.I30WFV1ZyI9D6t4Y7wLijgWjOhO19py",
        admin: false,
        email: "nikolan@gmail.com"
      },{
        name: "Sara",
        password: "$2b$10$2.aD3XXi7HH7v4Fgr1x2h.I30WFV1ZyI9D6t4Y7wLijgWjOhO19py",
        admin: true,
        email: "saras@gmail.com"
      },{
        name: "Anja",
        password: "$2b$10$2.aD3XXi7HH7v4Fgr1x2h.I30WFV1ZyI9D6t4Y7wLijgWjOhO19py",
        admin: false,
        email: "anjaa@gmail.com"
      },{
        name: "Petar",
        password: "$2b$10$2.aD3XXi7HH7v4Fgr1x2h.I30WFV1ZyI9D6t4Y7wLijgWjOhO19py",
        admin: true,
        email: "petarp@gmail.com"
      }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};

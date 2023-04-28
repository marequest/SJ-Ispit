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

    await queryInterface.bulkInsert('Authors', [
      {
        name: "Lav Tolstoj"
      },{
        name: "Fjodor Dostojevski"
      },{
        name: "Mark Tven"
      },{
        name: "Herman Melvil"
      },{
        name: "Džejn Ostin"
      }
  ], {});

    await queryInterface.bulkInsert('Books', [
      {
        categoryId: 1,
        title: "Anja Karenjina"
      },{
        categoryId: 3,
        title: "Zapisi iz podzemlja"
      },{
        categoryId: 1,
        title: "Gospodar prstenova"
      },{
        categoryId: 5,
        title: "Hari Poter Red Feniksa"
      },{
        categoryId: 1,
        title: "Osnove programiranja"
      }
    ], {});

    await queryInterface.bulkInsert('BookCopies', [
      {
        year_published: 2001,
        book_id: 1,
        publisher_id: 1
      },
      {
        year_published: 1954,
        book_id: 2,
        publisher_id: 1
      },
      {
        year_published: 1987,
        book_id: 3,
        publisher_id: 3
      },
      {
        year_published: 1999,
        book_id: 4,
        publisher_id: 1
      },
      {
        year_published: 2009,
        book_id: 5,
        publisher_id: 2
      },
    ], {});

    await queryInterface.bulkInsert('Categories', [
      {
        name: "Drama"
      },{
        name: "Romantika"
      },{
        name: "Beletristika"
      },{
        name: "Tragedija"
      },{
        name: "Komedija"
      },
    ], {});

    await queryInterface.bulkInsert('Chekouts', [
      {
        start_time: new Date(),
        end_time: new Date(),
        book_copy_id: 1,
        patron_id: 1,
        is_returned: true
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_copy_id: 2,
        patron_id: 3,
        is_returned: true
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_copy_id: 1,
        patron_id: 2,
        is_returned: false
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_copy_id: 1,
        patron_id: 4,
        is_returned: false
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_copy_id: 1,
        patron_id: 1,
        is_returned: true
      },
    ], {});

    await queryInterface.bulkInsert('Holds', [
      {
        start_time: new Date(),
        end_time: new Date(),
        book_id: 4,
        patron_id: 1
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_id: 3,
        patron_id: 3
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_id: 1,
        patron_id: 2
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_id: 1,
        patron_id: 4
      },{
        start_time: new Date(),
        end_time: new Date(),
        book_id: 1,
        patron_id: 3
      },
    ], {});

    await queryInterface.bulkInsert('Notifications', [
      {
        sent_at: new Date(),
        contents: "Uskoro vam istice rezervacija",
        patron_id: 4
      },{
        sent_at: new Date(),
        contents: "Upravo ste kupili knjigu",
        patron_id: 2
      },{
        sent_at: new Date(),
        contents: "Upravo ste rezervisali knjigu",
        patron_id: 3
      },{
        sent_at: new Date(),
        contents: "Pogledajte nove knjige na raspolaganju",
        patron_id: 3
      },{
        sent_at: new Date(),
        contents: "Istekao vam je period drzanja knjige, molimo vratite je u knjizaru",
        patron_id: 1
      },
    ], {});

    await queryInterface.bulkInsert('Patrons', [
      {
        first_name: "Nikola",
        surname: "Prodanovic",
        email: "nikola@gmail.com",
        status: true
      },{
        first_name: "Luka",
        surname: "Prodanovic",
        email: "luka@gmail.com",
        status: true
      },{
        first_name: "Nikola",
        surname: "Markovic",
        email: "nikola123@gmail.com",
        status: true
      },{
        first_name: "Marko",
        surname: "Markovic",
        email: "marko@gmail.com",
        status: true
      },{
        first_name: "Coic",
        surname: "Radovanovic",
        email: "coic@gmail.com",
        status: true
      },
    ], {});

    await queryInterface.bulkInsert('Waitlists', [
      {
        patron_id: 1,
        book_id: 4
      },      {
        patron_id: 3,
        book_id: 1
      },      {
        patron_id: 3,
        book_id: 5
      },      {
        patron_id: 2,
        book_id: 2
      },      {
        patron_id: 4,
        book_id: 3
      },
    ], {});

    await queryInterface.bulkInsert('BookAuthors', [
      {
        book_id: 1,
        author_id: 2
      },{
        book_id: 3,
        author_id: 5
      },{
        book_id: 1,
        author_id: 4
      },{
        book_id: 4,
        author_id: 3
      },{
        book_id: 4,
        author_id: 4
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Authors', null, {});
    await queryInterface.bulkDelete('BookAuthors', null, {});
    await queryInterface.bulkDelete('BookCopies', null, {});
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Chekouts', null, {});
    await queryInterface.bulkDelete('Holds', null, {});
    await queryInterface.bulkDelete('Notifications', null, {});
    await queryInterface.bulkDelete('Patrons', null, {});
    await queryInterface.bulkDelete('Waitlists', null, {});

  }
};

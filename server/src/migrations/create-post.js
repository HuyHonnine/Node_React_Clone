"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      star: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      address: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      attributesId: {
        type: Sequelize.STRING,
      },
      labelCode: {
        type: Sequelize.STRING,
      },
      categoryCode: {
        type: Sequelize.STRING,
      },
      priceCode: {
        type: Sequelize.STRING,
      },
      areaCode: {
        type: Sequelize.STRING,
      },
      provinceCode: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
      },
      imagesId: {
        type: Sequelize.STRING,
      },
      overviewId: {
        type: Sequelize.STRING,
      },
      priceNumber: {
        type: Sequelize.FLOAT,
      },
      areaNumber: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};

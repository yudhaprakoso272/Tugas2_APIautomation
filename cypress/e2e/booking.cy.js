/// <reference types="cypress" />

// require('dotenv').config();
// require("dotenv").config();

// const username = 'admin';
// const password = 'password123';

describe('E2E API Booking Test', () => {
  let token;
  let bookingId;
  let bookingData;

  before(() => {
    cy.fixture('bookingData').then((data) => {
      bookingData = data;
    });
  });

  // before(() => {
  //   cy.fixture('authData').then((data) => {
  //     authData = data;
  //   });
  // });

  // it('Get Auth Token', () => {
  //   cy.request({
  //     method: 'POST',
  //     url: 'https://restful-booker.herokuapp.com/auth',
  //     body: {
  //       username: Cypress.env('USERNAME'),
  //       password: Cypress.env('PASSWORD')
  //     }
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     token = response.body.token;
  //     expect(token).to.exist;
  //   });
  // });

  it('Get Auth Token', () => {
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    // const username = process.env.USERNAME;
    // const password = process.env.PASSWORD;
  
    // expect(username, 'USERNAME harus tersedia').to.exist;
    // expect(password, 'PASSWORD harus tersedia').to.exist;

    // console.log("USERNAME:", Cypress.env('USERNAME'));
    // console.log("PASSWORD:", Cypress.env('PASSWORD'));
  
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: { 
        username,
        password 
        // username: Cypress.env('USERNAME'),
        // password: Cypress.env('PASSWORD')
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      token = response.body.token;
    });
  });

  it('Create Booking', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: bookingData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking.firstname).to.eq(bookingData.firstname);
      expect(response.body.booking.lastname).to.eq(bookingData.lastname);
      bookingId = response.body.bookingid;
    });
  });

  it('Get Booking', () => {
    cy.request({
      method: 'GET',
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq(bookingData.firstname);
      expect(response.body.lastname).to.eq(bookingData.lastname);
    });
  });

  it('Delete Booking', () => {
    cy.request({
      method: 'DELETE',
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      headers: {
        Cookie: `token=${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201); // Dokumentasi: 201 Created untuk delete sukses
    });
  });
});

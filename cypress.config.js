const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    env:{
      apiUrl: 'http://localhost:3333'
    },
    projectId: "c6x4st",
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
     
    },
  },
});

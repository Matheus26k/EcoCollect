const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videoCompression: 15,
    videoUploadOnPasses: false,
    animationDistanceThreshold: 5,
    waitForAnimations: true,
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
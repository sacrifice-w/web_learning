module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,                      // Add this line
  collectCoverageFrom: ['src/components/HelloWorld.vue'], // Add this line
};
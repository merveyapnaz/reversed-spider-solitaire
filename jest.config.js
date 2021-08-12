module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  //collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js", // No need to cover bootstrap file
    "!src/common/enums/*.js", // No need to cover enum file
    "!src/common/constants/*.js", // No need to cover constants file
  ],
};

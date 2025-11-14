module.exports = function (api) {
  api.cache(true);

  const plugins = [];

  if (process.env.COVERAGE) {
    plugins.push("istanbul");
  }

  return {
    presets: ["babel-preset-gatsby"],
    plugins,
  };
};

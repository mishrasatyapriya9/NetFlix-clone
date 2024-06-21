const fs = require("fs");
const path = require("path");

const nodeModulesPath = path.resolve("node_modules");

const getDependencies = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((name) => {
      const packageJsonPath = path.join(dir, name, "package.json");
      return fs.existsSync(packageJsonPath);
    })
    .map((name) => {
      const packageJsonPath = path.join(dir, name, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      return { name: packageJson.name, version: packageJson.version };
    });
};

const dependencies = getDependencies(nodeModulesPath);
const devDependencies = getDependencies(path.join(nodeModulesPath, ".bin"));

console.log("Dependencies:");
dependencies.forEach((dep) => console.log(`"${dep.name}": "${dep.version}"`));

console.log("\nDevDependencies:");
devDependencies.forEach((dep) =>
  console.log(`"${dep.name}": "${dep.version}"`)
);

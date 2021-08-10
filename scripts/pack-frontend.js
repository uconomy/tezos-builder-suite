const fs = require("fs");
const path = require("path");

function rmFolderRecursiveSync(source) {
  var files = [];

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        rmFolderRecursiveSync(curSource);
      } else {
        fs.unlinkSync(curSource);
      }
    });

    fs.rmdirSync(source);
  }
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);

    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        var curDest = path.join(target, file);
        fs.mkdirSync(curDest);

        copyFolderRecursiveSync(curSource, curDest);
      } else {
        fs.copyFileSync(curSource, path.join(target, file));
      }
    });
  }
}

function copyFrontend() {
  const feBuildFolder = path.resolve(__dirname, '..', 'frontend', 'build');

  if (!fs.existsSync(feBuildFolder)) {
    throw new Error("Unable to find Frontend's build folder. Did you forget to run \"rush build\"?");
  }

  const deployFolder = path.resolve(__dirname, '..', 'backend', 'build');
  if (!fs.existsSync(deployFolder)) {
    throw new Error("It seems you did not builf backend before, please run \"rush buile\".");
  }

  const feDeployFolder = path.resolve(deployFolder, 'frontend');
  if (fs.existsSync(feDeployFolder)) {
    console.log("Found old frontend deploy, cleaning up...");
    rmFolderRecursiveSync(feDeployFolder);
  }

  fs.mkdirSync(feDeployFolder);

  copyFolderRecursiveSync(feBuildFolder, feDeployFolder);

  console.log('Frontend deploy prep finished.');
}

copyFrontend();
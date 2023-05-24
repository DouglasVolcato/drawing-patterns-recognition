const constants = require("../common/constants.js");
const features = require("../common/featureFunctions.js");

const fs = require("fs");

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

console.log("EXTRACTING FEATURES...");

for (const sample of samples) {
  const paths = JSON.parse(
    fs.readFileSync(constants.JSON_DIR + "/" + sample.id + ".json")
  );

  const functions = features.inUse.map((f) => f.function);
  sample.point = functions.map((f) => f(paths));

  sample.point = [features.getWidth(paths), features.getHeight(paths)];

  const featureNames = features.inUse.map((f) => f.name);

  fs.writeFileSync(
    constants.FEATURES,
    JSON.stringify({
      featureNames,
      samples: samples.map((s) => {
        return {
          point: s.point,
          label: s.label,
        };
      }),
    })
  );

  fs.writeFileSync(
    "../common/js_objects/features.js",
    "const features =" + JSON.stringify({ featureNames, samples }) + ";"
  );
}

console.log("DONE");

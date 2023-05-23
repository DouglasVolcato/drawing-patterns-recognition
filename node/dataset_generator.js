const constants = require("../common/constants.js");
const draw = require("../common/draw.js");
const utils = require("../common/utils.js");

const { createCanvas } = require("canvas");
const canvas = createCanvas(400, 400);
const context = canvas.getContext("2d");

const fs = require("fs");

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;

fileNames.forEach((fileName) => {
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fileName);
  const { session, student, drawings } = JSON.parse(content);

  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      session_id: session,
    });

    // fs.writeFileSync(
    //   constants.JSON_DIR + "/" + id + ".json",
    //   JSON.stringify(drawings[label])
    // );

    const paths = drawings[label];
    fs.writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths)
    );

    generateImageFIle(constants.IMG_DIR + "/" + id + ".png", paths);

    utils.printProgress(id, fileNames.length * 8);
    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

fs.writeFileSync(
  "../common/js_objects/samples.js",
  "const samples =" + JSON.stringify(samples) + ";"
);

function generateImageFIle(outputFile, paths) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw.paths(context, paths);

  const buffer = canvas.toBuffer("image/png");

  fs.writeFileSync(outputFile, buffer);
}

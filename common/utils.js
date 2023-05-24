const utils = {};

utils.formatPercent = (value) => {
  return (value * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);

  const percent = utils.formatPercent(count / max);

  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (objArray, key) => {
  const groups = {};

  for (let obj of objArray) {
    const val = obj[key];
    if (groups[val] == null) {
      groups[val] = [];
    }
    groups[val].push(obj);
  }
  return groups;
};

utils.findLongestArrayObject = (obj) => {
  let longestArrayProp = null;
  let longestArrayLength = 0;

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && Array.isArray(obj[prop])) {
      const currentArrayLength = obj[prop].length;

      if (currentArrayLength > longestArrayLength) {
        longestArrayLength = currentArrayLength;
        longestArrayProp = prop;
      }
    }
  }

  return longestArrayProp;
};

utils.getNearest = (width, height, samples) => {
  function calculateDistance(point1, point2) {
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  const distances = samples.map((sample) => {
    const point = sample.point;
    const distance = calculateDistance(point, [width, height]);
    return { sample, distance };
  });

  distances.sort((a, b) => a.distance - b.distance);
  const closestItens = distances.slice(0, 7).map((item) => item.sample);
  return utils.findLongestArrayObject(utils.groupBy(closestItens, "label"));
};

utils.styles = {
  car: { color: "gray", emoji: "🚗" },
  fish: { color: "red", emoji: "🐠" },
  house: { color: "yellow", emoji: "🏠" },
  tree: { color: "green", emoji: "🌳" },
  bicycle: { color: "cyan", emoji: "🚲" },
  guitar: { color: "blue", emoji: "🎸" },
  pencil: { color: "magenta", emoji: "✏️" },
  clock: { color: "lightgray", emoji: "⏰" },
};

if (typeof module !== "undefined") {
  module.exports = utils;
}

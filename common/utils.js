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

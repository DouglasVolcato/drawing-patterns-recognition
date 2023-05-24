function createRow(container, studentName, samples) {
  const row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);

  const rowLabel = document.createElement("div");
  rowLabel.innerHTML = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  for (let sample of samples) {
    const { id, label } = sample;

    const sampleContainer = document.createElement("div");
    sampleContainer.id = "sample_" + id;
    sampleContainer.onclick = () => handleClick(sample, false);
    sampleContainer.classList.add("sampleContainer");

    const sampleLabel = document.createElement("div");
    sampleLabel.innerHTML = label;
    sampleContainer.appendChild(sampleLabel);

    const img = document.createElement("img");
    img.src = constants.IMG_DIR + "/" + id + ".png";
    img.classList.add("thumb");
    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
}

function handleClick(sample, doScroll = true) {
  [...document.querySelectorAll(".emphasize")].forEach((e) =>
    e.classList.remove("emphasize")
  );

  const el = document.getElementById("sample_" + sample.id);
  el.classList.add("emphasize");

  if (doScroll) {
    el.scrollIntoView({ behavior: "auto", block: "center" });
  }
}

function toggleInput() {
  if (inputContainerBackground.style.display == "none") {
    inputContainerBackground.style.display = "block";
  } else {
    inputContainerBackground.style.display = "none";
  }
}

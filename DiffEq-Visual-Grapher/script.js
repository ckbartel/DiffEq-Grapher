let xCoords = [];
let yCoords = [];
function differentialEquation(x, y) {
  return eval(document.getElementById("diffEq").value);
}
function getXAndY(initialX, initialY, finalX, stepSize, dydx) {
  let newY = initialY;
  let newX = initialX;
  xCoords = [initialX];
  yCoords = [initialY];
  for (let i = 0; i < (finalX - initialX) / stepSize; i++) {
    newY += dydx(newX, newY) * stepSize;
    newX += stepSize;
    xCoords.push(newX);
    yCoords.push(newY);
  }
  newY = initialY;
  newX = initialX;
  for (let i = 0; i < (finalX - initialX) / stepSize; i++) {
    newY -= dydx(newX, newY) * stepSize;
    newX -= stepSize;
    xCoords.unshift(newX);
    yCoords.unshift(newY);
  }
}
function graphIt() {
  let X = parseFloat(document.getElementById("xPoint").value);
  let stepAmount = parseFloat(document.getElementById("stepAmount").value)
  console.log(X, parseFloat(document.getElementById("yPoint").value), X + stepAmount, parseFloat(document.getElementById("stepSize").value) * Math.sign(stepAmount));
  getXAndY(X, parseFloat(document.getElementById("yPoint").value), X + stepAmount, parseFloat(document.getElementById("stepSize").value) * Math.sign(stepAmount), differentialEquation);
  let data = [{
    x: xCoords,
    y: yCoords,
    mode: "lines",
    type: "scatter"
  }];
  let layout = {
    title: "DiffEq Graph",
    xaxis: { range: [X - stepAmount, X + stepAmount] },
    yaxis: { range: [X - stepAmount, X + stepAmount]}
  }
  Plotly.newPlot("graph", data, layout);
}
//check solution with grapher: https://www.geogebra.org/m/W7dAdgqc
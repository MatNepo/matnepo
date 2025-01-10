let dataCount = 0;
let accuracy = 50;
let loss = 50;

function collectData() {
  dataCount++;
  document.getElementById('score').innerText = `Собрано данных: ${dataCount}`;
  updateMetrics();
  plotDataPoint();
}

function updateMetrics() {
  // Accuracy растёт, Loss уменьшается
  accuracy = Math.min(100, accuracy + Math.random() * 2);
  loss = Math.max(0, loss - Math.random() * 2);

  document.getElementById('accuracy').innerText = `${accuracy.toFixed(1)}%`;
  document.getElementById('loss').innerText = `${loss.toFixed(1)}%`;
}

function plotDataPoint() {
  const graph = document.getElementById('graph');
  const point = document.createElement('div');
  point.className = 'data-point';
  point.style.left = `${Math.random() * 100}%`;
  point.style.bottom = `${Math.random() * 100}%`;
  graph.appendChild(point);

  // Удаление точек данных после некоторого времени
  setTimeout(() => point.remove(), 5000);
}

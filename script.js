// Initialize Chart.js
const ctx = document.getElementById('live-chart').getContext('2d');
const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Live Data',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [],
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    }
});

// Update chart data based on range value
const range = document.getElementById('range');
let startTime = Date.now();

function updateChart() {
    const elapsedSeconds = (Date.now() - startTime) / 1000;

    if (elapsedSeconds >= 15) {
        clearInterval(interval);
        return;
    }

    const xValue = elapsedSeconds.toFixed(1);
    const yValue = parseFloat(range.value);

    liveChart.data.labels.push(xValue);
    liveChart.data.datasets[0].data.push(yValue);
    liveChart.update();
}

const interval = setInterval(updateChart, 100); // Update every 0.1 seconds

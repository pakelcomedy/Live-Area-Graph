// Initialize Chart.js
const ctx = document.getElementById('live-chart').getContext('2d');
const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Live Data',
            backgroundColor: 'rgba(93, 135, 125, 0.5)',
            borderColor: 'rgba(93, 135, 125, 1)',
            borderWidth: 1,
            data: [],
            fill: 'origin' // Fill area below the line
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 15,
                grid: {
                    display: false // Hide x-axis grid lines
                },
                ticks: {
                    display: false // Hide x-axis ticks
                }
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                grid: {
                    display: false // Hide y-axis grid lines
                },
                ticks: {
                    display: false // Hide y-axis ticks
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide legend
            }
        },
        elements: {
            point: {
                radius: 0 // Hide points
            },
            line: {
                tension: 0.1 // Smoother line
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

    // Remove old data if it exceeds 15 seconds
    if (elapsedSeconds > 15) {
        liveChart.data.labels.shift();
        liveChart.data.datasets[0].data.shift();
    }

    liveChart.update();
}

const interval = setInterval(updateChart, 100); // Update every 0.1 seconds

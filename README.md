# Live Area Graph

This project demonstrates how to create a dynamic live area graph using Chart.js. The graph displays values from an HTML range input, updating every 0.1 seconds for up to 15 seconds.

## Features

- Dynamic live area graph
- Data updates every 0.1 seconds
- Graph stops updating after 15 seconds
- Responsive and clean UI
- No background, borders, or grid lines

## Technologies Used

- HTML
- CSS
- JavaScript
- Chart.js

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Web browser (latest version recommended)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/pakelcomedy/Live-Area-Graph.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Live-Area-Graph
    ```

### Usage

1. Open the `index.html` file in your web browser:
    ```bash
    open index.html
    ```

2. Use the range input to see the live area graph update in real-time.

## Project Structure

- `index.html`: Contains the HTML structure and range input.
- `styles.css`: Contains the CSS styles for the project.
- `script.js`: Contains the JavaScript code to handle the graph updates.

## Code Overview

### HTML

Provides the structure for the range input and the canvas for the graph.

```html
<input type="range" id="range" max="100" min="0" value="0" step="0.1">
<div class="graph-container">
    <canvas id="live-chart"></canvas>
</div>
```

### CSS

Styles the graph container and canvas to remove background, borders, and outlines.

```css
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    text-align: center;
    background-color: #f0f0f0;
}

.graph-container {
    width: 80%;
    margin: 20px auto;
    border: none;
}

canvas {
    background-color: transparent !important;
    border: none;
    outline: none;
}
```

### JavaScript

Handles the initialization and updating of the Chart.js graph.

```javascript
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
            fill: 'origin'
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
                grid: { display: false },
                ticks: { display: false }
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                grid: { display: false },
                ticks: { display: false }
            }
        },
        plugins: { legend: { display: false } },
        elements: {
            point: { radius: 0 },
            line: { tension: 0.4 }
        }
    }
});

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

    if (elapsedSeconds > 15) {
        liveChart.data.labels.shift();
        liveChart.data.datasets[0].data.shift();
    }

    liveChart.update();
}

const interval = setInterval(updateChart, 100);
```

## Screenshot

![image](https://github.com/user-attachments/assets/01486b4a-170c-4609-97d1-78baecb62aac)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

## Acknowledgements

- [Chart.js](https://www.chartjs.org/) for the amazing charting library.

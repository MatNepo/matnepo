const svg = document.getElementById('commitSvg');

// Set SVG size
const svgWidth = 1200;
const svgHeight = 600;
svg.setAttribute('width', svgWidth);
svg.setAttribute('height', svgHeight);

const blockSize = 15; // Size of each "commit" block
const blockSpacing = 2; // Spacing between blocks
const borderRadius = 3; // Rounded corners for blocks
const rows = 7;
const cols = 52; // Matches GitHub commit grid
const colors = ["#002d04", "#005c08", "#00a310", "#1aff1a"]; // Shades of green

// Create a 2D array of blocks
let blocks = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
        x: col * (blockSize + blockSpacing),
        y: row * (blockSize + blockSpacing),
        color: colors[Math.floor(Math.random() * colors.length)],
        falling: false,
        delay: Math.random() * 1000 // Random delay for fall animation
    }))
);

    const matnepoPattern = [
    "## ##  ##   ### #   ##   ## ##   ###   ###   ###",
    "########## ## ###   ##   ###### ## ## ## ## ## ##",
    "##  ##  ## ##  ## ###### ##  ## ####  ####  #   #",
    "##  ##  ## ## ###   ##   ##  ## ##    ##    ## ##",
    "##  ##  ##  ### ### #### ##  ##  ###  ##     ###"
    ];

// Mark blocks that will remain for "matnepo"
const textBlocks = [];
matnepoPattern.forEach((line, row) => {
    [...line].forEach((char, col) => {
        if (char === "#") {
        textBlocks.push({ row, col });
        }
    });
});

// Animation variables
let falling = false;
let animationInterval;

// Draw blocks with rounded corners
function drawRoundedRect(x, y, width, height, radius, color) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('rx', radius);
    rect.setAttribute('ry', radius);
    rect.setAttribute('fill', color);
    svg.appendChild(rect);
}

// Draw blocks
function drawBlocks() {
    svg.innerHTML = ''; // Clear the SVG before redrawing
    blocks.forEach(row =>
        row.forEach(block => {
        if (!block.falling) {
            drawRoundedRect(block.x, block.y, blockSize - 1, blockSize - 1, borderRadius, block.color);
        }
        })
    );
}

// Start falling animation
function startFalling() {
    falling = true;
    const startTime = Date.now();
    animationInterval = setInterval(() => {
        blocks.forEach((row, rowIndex) =>
        row.forEach((block, colIndex) => {
            const isInText = textBlocks.some(
            b => b.row === rowIndex && b.col === colIndex
            );
            if (!isInText && !block.falling && Date.now() - startTime > block.delay) {
            block.y += blockSize / 5; // Fall speed
            if (block.y > svgHeight) block.falling = true;
            }
        })
        );
        drawBlocks();

        // Stop animation if all blocks have fallen
        if (blocks.every(row => row.every(block => block.falling))) {
        clearInterval(animationInterval);
        }
    }, 20);
}

// Initialize and start animation on click
drawBlocks();
setTimeout(startFalling, 2000);

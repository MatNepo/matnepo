# Game Visualizer for GitHub Profile
# This script generates a dynamic activity visualization for your GitHub profile.
# The visualization updates your README.md with an image representation of your progress.

import os
import numpy as np
from PIL import Image, ImageDraw
from datetime import datetime
import random

def generate_commit_graph(output_path="activity_graph.png"):
    """Generate a GitHub-style activity graph as an image."""
    cols, rows = 53, 7  # GitHub-style grid: 53 weeks, 7 days
    cell_size = 15       # Size of each cell
    padding = 2          # Space between cells

    # Create a blank image
    width = cols * cell_size + (cols - 1) * padding
    height = rows * cell_size + (rows - 1) * padding
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)

    # Generate random activity levels for cells (0-4, like GitHub)
    activity_levels = np.random.randint(0, 5, size=(rows, cols))

    # Colors corresponding to activity levels
    colors = {
        0: (235, 237, 240),  # Light gray
        1: (155, 233, 168),  # Light green
        2: (64, 196, 99),    # Medium green
        3: (48, 161, 78),    # Darker green
        4: (33, 110, 57),    # Dark green
    }

    # Draw the cells
    for row in range(rows):
        for col in range(cols):
            x0 = col * (cell_size + padding)
            y0 = row * (cell_size + padding)
            x1 = x0 + cell_size
            y1 = y0 + cell_size
            activity = activity_levels[row, col]
            draw.rectangle([x0, y0, x1, y1], fill=colors[activity])

    # Save the image
    image.save(output_path)
    print(f"Activity graph saved as {output_path}")

def update_readme(graph_path="activity_graph.png"):
    """Update the README.md file with the activity graph image."""
    readme_content = f"""# My GitHub Activity

This is a dynamic visualization of my activity inspired by GitHub's contribution graph.

![Activity Graph](./{graph_path})

Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}.

"""
    with open("README.md", "w") as readme_file:
        readme_file.write(readme_content)
    print("README.md updated with the activity graph.")

if __name__ == "__main__":
    graph_path = "activity_graph.png"
    generate_commit_graph(graph_path)
    update_readme(graph_path)

// Function to generate a random hex color
function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to ensure the color is not too light (for text visibility)
function ensureReadableColor(color: string): string {
  // Convert hex to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // If too light, darken it
  if (brightness > 200) {
    return `#${Math.floor(r * 0.7).toString(16).padStart(2, '0')}${Math.floor(g * 0.7).toString(16).padStart(2, '0')}${Math.floor(b * 0.7).toString(16).padStart(2, '0')}`;
  }
  
  return color;
}

// Store generated colors for each category
const generatedColors: { [key: string]: string } = {};

export function getCategoryColor(category: string | undefined): string {
  if (!category) return '#E0E0E0';
  
  // Normalize the category name (trim and convert to lowercase)
  const normalizedCategory = category.trim().toLowerCase();
  
  // If we haven't generated a color for this category yet, generate one
  if (!generatedColors[normalizedCategory]) {
    generatedColors[normalizedCategory] = ensureReadableColor(getRandomColor());
  }
  
  return generatedColors[normalizedCategory];
} 
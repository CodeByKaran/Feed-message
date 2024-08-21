

const generateHexColorWithOpacity = (opacity = 1) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const hexColor = `#${randomColor.padStart(6, '0')}`;

  // Convert hex to RGB
  const bigint = parseInt(hexColor.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return rgba color with the specified opacity
  return `rgba(${r},${g},${b},${opacity})`;
};


export {
   generateHexColorWithOpacity
}
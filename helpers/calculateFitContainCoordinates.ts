export const calculateFitContainCoordinates = (
  imageWidth: number,
  imageHeight: number,
  screenWidth: number,
  screenHeight: number
) => {
  // Calculate image and canvas aspect ratios
  const imageAspect = imageWidth / imageHeight;
  const canvasAspect = screenWidth / screenHeight;

  let x0, y0, x1, y1;

  if (imageAspect > canvasAspect) {
    // Image is wider than canvas
    const scaledHeight = screenWidth / imageAspect;
    x0 = 0;
    y0 = (screenHeight - scaledHeight) / 2;
    x1 = screenWidth;
    y1 = y0 + scaledHeight;
  } else if (imageAspect < canvasAspect) {
    // Image is taller than canvas
    const scaledWidth = screenHeight * imageAspect;
    x0 = (screenWidth - scaledWidth) / 2;
    y0 = 0;
    x1 = x0 + scaledWidth;
    y1 = screenHeight;
  } else {
    // Image and canvas have the same aspect ratio
    x0 = 0;
    y0 = 0;
    x1 = screenWidth;
    y1 = screenHeight;
  }

  return { x0, y0, x1, y1 };
};

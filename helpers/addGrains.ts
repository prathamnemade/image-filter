export function addGrain(
  out: Uint8Array,
  image: Uint8Array,
  imageWidth: number,
  imageHeight: number,
  scale: number,
  intensity: number
) {
  console.log("start", new Date());
  const pixelCount = imageWidth * imageHeight;

  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;

    // Calculate random grain values for each color channel
    const grainR = (Math.random() - 0.5) * intensity;
    const grainG = (Math.random() - 0.5) * intensity;
    const grainB = (Math.random() - 0.5) * intensity;

    // Apply grain to the pixel
    out[offset] = Math.min(255, Math.max(0, image[offset] + grainR * scale));
    out[offset + 1] = Math.min(
      255,
      Math.max(0, image[offset + 1] + grainG * scale)
    );
    out[offset + 2] = Math.min(
      255,
      Math.max(0, image[offset + 2] + grainB * scale)
    );
    out[offset + 3] = image[offset + 3]; // Alpha channel remains unchanged
  }
  console.log("end", new Date());
}

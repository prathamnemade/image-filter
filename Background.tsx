import {
  Canvas,
  Image,
  SkImage,
  Skia,
  useCanvasRef,
} from "@shopify/react-native-skia";
import { useState } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { addGrain } from "./helpers/addGrains";
import { calculateFitContainCoordinates } from "./helpers/calculateFitContainCoordinates";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Background = ({ image }: { image: SkImage }) => {
  const canvasRef = useCanvasRef();
  const [snapShotImage, setSnapShotImage] = useState<SkImage | null>(null);

  const snapshotHandler = () => {
    const { width: originalImageWidth, height: originalImageHeight } =
      image.getImageInfo();
    const { x0, y0, x1, y1 } = calculateFitContainCoordinates(
      originalImageWidth,
      originalImageHeight,
      screenWidth,
      screenHeight
    );

    const newImage = canvasRef.current?.makeImageSnapshot({
      x: x0,
      y: y0,
      width: x1,
      height: y1 - y0,
    });
    const newImageInfo = newImage?.getImageInfo();
    if (newImageInfo) {
      const { alphaType, colorType, width, height } = newImageInfo;
      const pixels = newImage?.readPixels(0, 0, {
        width,
        height,
        alphaType,
        colorType,
      });
      const newImagePixels = new Uint8Array(width * height * 4);
      addGrain(
        newImagePixels,
        pixels as Uint8Array,
        width,
        height,
        2, // grainScale: min: 0.01; max: 2
        50 // grain intensity: min: 0 max: 0.25
      );
      const newImageData = Skia.Data.fromBytes(newImagePixels as Uint8Array);
      const newImageToRender = Skia.Image.MakeImage(
        {
          width,
          height,
          alphaType,
          colorType,
        },
        newImageData,
        width * 4
      );
      setSnapShotImage(newImageToRender);
    }
  };

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={styles.canvasContainer}>
        <Image
          image={snapShotImage || image}
          fit="contain"
          x={0}
          y={0}
          width={screenWidth}
          height={screenHeight}
        />
      </Canvas>
      <Button title="Snapshot" onPress={snapshotHandler} />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
});

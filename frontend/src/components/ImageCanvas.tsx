import { useEffect, useRef } from 'react';

interface IImageCanvasProps {
  imageSrc: string;
  width: number;
  height?: number;
}

export const ImageCanvas = (props: IImageCanvasProps) => {
  const { imageSrc, width: imageWidth, height: imageHeight } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const aspectRatio = image.width / image.height;

      let newWidth = imageWidth;
      let newHeight = imageHeight || imageWidth / aspectRatio;
      if (imageHeight && imageWidth / imageHeight > aspectRatio) {
        newWidth = imageHeight * aspectRatio;
      } else if (imageHeight) {
        newHeight = imageWidth / aspectRatio;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      if (ctx) {
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
      }
    };
  }, [imageSrc, imageWidth, imageHeight]);

  return <canvas ref={canvasRef} />;
};

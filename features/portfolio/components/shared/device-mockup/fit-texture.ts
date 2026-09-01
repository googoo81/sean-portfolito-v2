import {
  ClampToEdgeWrapping,
  SRGBColorSpace,
  type Texture,
} from "three";

export function fitTextureCover(
  texture: Texture,
  planeWidth: number,
  planeHeight: number,
) {
  const image = texture.image as
    | HTMLImageElement
    | HTMLVideoElement
    | ImageBitmap
    | { width: number; height: number }
    | undefined;

  if (!image) {
    return;
  }

  const width =
    "videoWidth" in image && image.videoWidth
      ? image.videoWidth
      : "width" in image
        ? image.width
        : 0;
  const height =
    "videoHeight" in image && image.videoHeight
      ? image.videoHeight
      : "height" in image
        ? image.height
        : 0;

  if (!width || !height) {
    return;
  }

  const imageAspect = width / height;
  const planeAspect = planeWidth / planeHeight;

  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.colorSpace = SRGBColorSpace;

  if (imageAspect > planeAspect) {
    const repeatX = planeAspect / imageAspect;
    texture.repeat.set(repeatX, 1);
    texture.offset.set((1 - repeatX) / 2, 0);
  } else {
    const repeatY = imageAspect / planeAspect;
    texture.repeat.set(1, repeatY);
    texture.offset.set(0, (1 - repeatY) / 2);
  }

  texture.needsUpdate = true;
}

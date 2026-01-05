export async function convertImageToBase64(image) {
  const imageBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);
  const imageBase64 = imageData.toString("base64");

  return imageBase64;
}

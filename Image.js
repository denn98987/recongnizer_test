import * as FileSystem from "expo-file-system";
import * as jpeg from "jpeg-js";
import * as ImageManipulator from "expo-image-manipulator";
import { util, tensor3d } from "@tensorflow/tfjs";

export const preprocessImage = async (uri) => {
  const uriCopiedImg = await copyImg(uri);
  const manipResult = await ImageManipulator.manipulateAsync(
    uriCopiedImg,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.JPEG }
  );

  const imgB64 = await FileSystem.readAsStringAsync(manipResult.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const rawImageData = util.encodeString(imgB64, "base64").buffer;
  return rawImageData;
};

export const imageToTensor = (rawImageData) => {
  const TO_UINT8ARRAY = true;
  const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  // Drop the alpha channel info for mobilenet
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0; // offset into original data
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];

    offset += 4;
  }

  return tensor3d(buffer, [height, width, 3]);
};

copyImg = async (uri) => {
  let filename = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
  let path = uri.substring(0, uri.lastIndexOf("/") + 1);
  let copyFilePath = path + "copy" + filename;
  try {
    await FileSystem.copyAsync({ from: uri, to: copyFilePath });
  } catch (e) {
    throw new error("copy assync doen't work", e);
  }
  return copyFilePath;
};

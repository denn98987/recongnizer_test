import React, { useState, useEffect, usePermissions } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

takePhoto = async (navigation, cameraRef) => {
  if (cameraRef) {
    let photo = await cameraRef.takePictureAsync();
    navigation.push("Recognized", {
      uri: photo.uri,
    });
  }
};

const CameraScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type] = useState(Camera.Constants.Type.back);
  let { granted } = Permissions.askAsync(Permissions.CAMERA);
  console.log(granted);

  return (
    <View style={styles.CameraScreen}>
      <Camera
        type={type}
        style={styles.camera}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={async () => await takePhoto(navigation, cameraRef)}
          >
            <View style={styles.CameraBtnOutter}>
              <View style={styles.CameraBtnInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  CameraScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-end",
  },
  CameraBtnOutter: {
    borderWidth: 2,
    // borderRadius: "50",
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  CameraBtnInner: {
    borderWidth: 2,
    // borderRadius: "50",
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
});

export default CameraScreen;

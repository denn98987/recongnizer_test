import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const getGalleryPhoto = async (navigation) => {
  let { granted, canAskAgain } = await Permissions.askAsync(Permissions.CAMERA);
  console.log(canAskAgain);

  if (granted) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.push("Recognized", {
        uri: result.uri,
      });
    }
  }
};

const GalleryScreen = ({ navigation }) => {
  return (
    <View style={styles.GalleryScreen}>
      <Button title="Recognise" onPress={() => getGalleryPhoto(navigation)} />
      <Text>Gallery is here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  GalleryScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GalleryScreen;

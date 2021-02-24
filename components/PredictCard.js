import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, StatusBar, Text } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { FlatList } from "react-native-gesture-handler";
import { preprocessImage, imageToTensor } from "../Image";
import { DotsLoader } from "react-native-indicator";

const BACKEND_TO_USE = "rn-webgl";

const Item = ({ item }) => (
  <View>
    <Text>
      Class name: {item.className}. {Math.round(item.probability * 100)}%
    </Text>
  </View>
);

const PredictCard = ({ route }) => {
  const [prediction, setPrediction] = useState([]);
  const isTfReady = useState(false);

  useEffect(() => {
    const processingPrediction = async () => {
      await tf.setBackend(BACKEND_TO_USE);
      await tf.ready();
      // Load mobilenet
      const model = await mobilenet.load();

      //warmup mobilenet
      await model.classify(tf.zeros([1, 224, 224, 3]));

      const rawImageData = await preprocessImage(route.params.uri);
      const imageTensor = imageToTensor(rawImageData);
      const imageTensorSum = imageTensor.sum();

      setPrediction(await model.classify(imageTensor));
      tf.dispose([imageTensor, imageTensorSum]);
    };
    processingPrediction();
  }, []);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };
  return (
    <View style={styles.sectionContainer}>
      <Image
        style={styles.cardImg}
        source={{
          uri: route.params.uri,
        }}
      ></Image>
      <Text style={styles.resultTextHeader}>Results</Text>
      {prediction.length === 0 ? (
        <DotsLoader style={styles.loader} />
      ) : (
        <FlatList
          data={prediction}
          renderItem={renderItem}
          style={styles.list}
        ></FlatList>
      )}
    </View>
  );
};

export default PredictCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // alignItems: "center",
  },
  cardImg: {
    width: "100%",
    height: "75%",
    // resizeMode: "cover",
  },
  resultTextHeader: {
    textAlign: "center",
    fontSize: 20,
  },
  list: {
    padding: 15,
  },
  loader: {
    textAlign: "center",
    marginLeft: "45%",
  },
});

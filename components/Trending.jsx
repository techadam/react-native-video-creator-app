import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setplay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem == item.$id ? zoomIn : zoomOut}
      duration={350}
    >
      {play ? (
        <Video
          source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' || item.video }}
          className="bg-white/10 w-52 h-72 rounded-[35px] mt-3"
          resizeMode={ResizeMode.CONTAIN}
          autoplay
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setplay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setplay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5  overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setactiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setactiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery, placeholder }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-16 bg-black-100 px-4 rounded-2xl border-2 border-black-200 focus:border-secondary flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder || 'Search for a video topic'}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});

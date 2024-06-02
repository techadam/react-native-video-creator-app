import { FlatList, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { useEffect } from "react";
import { getAllPosts, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Search = () => {
  const { data: posts, refetch } = useAppwrite(() => getAllPosts());

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View>
              <Text className="font-pmedium text-xl text-gray-100">
                Saved Videos
              </Text>
              {/* <Text className="text-2xl font-psemibold text-white ">
                {query}
              </Text> */}

              <View className="mt-6 mb-8">
                <SearchInput initialQuery="" placeholder="Search your saved videos" />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

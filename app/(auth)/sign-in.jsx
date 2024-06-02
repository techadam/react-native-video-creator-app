import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { signIn, getCurrentUser } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setuser, setisLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.password || !form.email) {
      return Alert.alert("Error", "Fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      //set it to global state using context api .........
      setuser(result);
      setisLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] my-6 px-4 justify-center">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-psemibold mt-10 font-semibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={() => submit()}
            containerStyles="w-full mt-10"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="font-psemibold text-secondary text-lg"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

/*import {View, Text, Alert, Image, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
import {SubscribersService} from "@/services/subscribersService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "@/constants/icons";

//WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = ({ onLoginSuccess}: { onLoginSuccess: (user:any) => void}) => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_IOS_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_WEB_ID
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication?.accessToken);
    }
  },[response])

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      // obtencion de info de google
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const googleUser = await res.json();

      // guardamos en backend
      const subResponse = await SubscribersService.subscribe(
        googleUser.name,
        googleUser.email,
      );

      // 3. Guardamos sesión y notificamos éxito
      const userData = subResponse.data;
      await AsyncStorage.setItem('user_session', JSON.stringify(userData));
      onLoginSuccess(userData);

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <TouchableOpacity
      className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
      disabled={!request}
      onPress={() => promptAsync()}
    >
      <View className="flex flex-row items-center justify-center">
        <Image
          source={icons.google}
          className="w-5 h-5"
          resizeMode="contain"
        />

        <Text className="text-lg font-rubik-medium text-black-300 ml-2">
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default GoogleLogin
*/
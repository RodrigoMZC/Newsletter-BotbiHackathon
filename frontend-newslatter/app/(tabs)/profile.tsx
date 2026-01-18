import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
  ActivityIndicator
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import {settings} from "@/constants/profile";
import images from "@/constants/images";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subscribe from "@/app/subscribe";

interface SettingsItemProps {
  icon: ImageSourcePropType
  title: string
  onPress?:() => void
  textStyle?: string
  showArrow?: boolean
}

interface User {
  name: string
  email: string
  avatar: any
}

const SettingsItem = ({
                        icon,
                        title,
                        onPress,
                        textStyle,
                        showArrow=true
                      }: SettingsItemProps) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between py-3"
    onPress={onPress}
  >
    <View className="flex flex-row items-center gap-3">
      <Image
        source={icon}
        className="size-6"
      />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
)

const Profile = () => {

  const [user, setUser] = useState<any>(null)
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await AsyncStorage.getItem('user_session');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (e) {
      console.error("Error leyendo sesión", e);
    } finally {
      setCheckingSession(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem('user_session');
          setUser(null);
        }
      }
    ]);
  };

  if (checkingSession) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" className="text-primary-300" />
      </View>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Subscribe onLoginSuccess={(userData) => setUser(userData)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-6"
      >
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image
            source={icons.bell}
            className="size-5"
          />
        </View>

        <View className="flex-row justify-center flex">
          <View className="flex flex-col items-center relative mt-2">
            <Image
              source={ user?.avatar ? { uri: user.avatar } : images.avatar }
              className="w-44 h-44 relative rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image
                source={icons.edit}
                className="size-9"
                tintColor='#E11D48'
              />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Profile

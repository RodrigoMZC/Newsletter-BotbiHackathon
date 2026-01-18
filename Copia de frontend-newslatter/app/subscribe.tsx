import {View, Text, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput} from 'react-native'
import React, {useState} from 'react';
import images from "@/constants/images";
import {Redirect, useRouter} from "expo-router";
import {SubscribersService} from "@/services/subscribersService";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  onLoginSuccess?: (user: any) => void;
}

const Subscribe = ({ onLoginSuccess }: Props) => {
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (userData: any) => {
    // 1. Siempre guardamos en storage
    try {
      await AsyncStorage.setItem('user_session', JSON.stringify(userData));

      // 2. Decisión: ¿Me llamó un padre (Profile) o soy una pantalla sola?
      if (onLoginSuccess) {
        // Modo incrustado (dentro de Profile): Avisamos al padre para que actualice el estado
        onLoginSuccess(userData);
      } else {
        // Modo pantalla completa: Navegamos al Home
        router.replace('/(tabs)');
      }

    } catch (e) {
      console.error("Error guardando sesión:", e);
    }
  };

  const handleManualSubscribe = async () => {
    if (!name || !email) {
      Alert.alert("Datos Incompletos", "Por favor ingresa tu nombre y correo.");
      return;
    }

    setLoading(true);
    try {
      // 1. Backend
      const response = await SubscribersService.subscribe(name, email);

      console.log("Respuesta Backend:", response);

      const userToSave = response.data || response;

      if (!userToSave) throw new Error("La respuesta del servidor no contiene datos de usuario");

      // 2. Guardar sesión
      await handleSuccess(response.data);
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
      <ScrollView
        className='flex-1'
        contentContainerClassName='pb-20'
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={images.onboarding}
          className="w-full h-[400px]"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text
            className="text-base text-center uppercase font-rubik text-black-200"
          >
            Welcome to NOVASIDE
          </Text>

          <Text
            className="text-3xl font-rubik-bold text-black-300 text-center mt-2"
          >
            Menos ruido. Más visión. {"\n"}
            <Text className="text-primary-300">Noticias al instante</Text>
          </Text>

          {/* Formulario Manual */}
          <View className="space-y-4">
            <View>
              <Text className="text-black-200 font-rubik-medium mb-2">Nombre Completo</Text>
              <TextInput
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-black-300 font-rubik"
                placeholder="Ej. Juan Pérez"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View className="mt-4">
              <Text className="text-black-200 font-rubik-medium mb-2">Correo Electrónico</Text>
              <TextInput
                className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-black-300 font-rubik"
                placeholder="juan@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              onPress={handleManualSubscribe}
              disabled={loading}
              className="bg-primary-300 rounded-xl p-4 items-center mt-6 shadow-lg shadow-primary-300/30"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-rubik-bold text-lg">Suscribirme</Text>
              )}
            </TouchableOpacity>
          </View>

          {/*<View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-100" />
            <Text className="mx-4 text-gray-400 font-rubik text-sm">O continúa con</Text>
            <View className="flex-1 h-px bg-gray-100" />
          </View>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login with Google
          </Text>
          <GoogleLogin onLoginSuccess={onLoginSuccess} />*/}
        </View>
      </ScrollView>
  )
}
export default Subscribe

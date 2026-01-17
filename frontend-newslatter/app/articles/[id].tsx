import {useLocalSearchParams, useRouter} from "expo-router";
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Article, NewsService} from "@/services/newsService";
import icons from "@/constants/icons";
import {StatusBar} from "expo-status-bar";
import images from "@/constants/images";

const ArticleDetails = () => {
  const { id } =useLocalSearchParams()
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return
      setIsLoading(false)

      const data = NewsService.getArticle(id as string)
      setArticle(data);
      setIsLoading(false )
    }

    loadArticle()
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' className='text-primary-300' />
      </SafeAreaView>
    );
  }

  if (!article) {
    return (
      <SafeAreaView
        className='flex-1 justify-center items-center bg-white px-4'
      >
        <Text className='text-xl font-rubik-bold text-black-300 text-center'>
          Baaang. Exploto la app. No se encontro la noticia
        </Text>
        <TouchableOpacity
          className='mt-4 bg-primary-300 px-6 py-3 rounded-full'
          onPress={() => router.back()}
        >
          <Text className='text-white font-rubik-medium'>
            Volver al inicio
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <View className="flex-1 bg-white">
      {/* status bar blanca para distinguirla  */}
      <StatusBar style="light" />

      <View className="absolute top-0 w-full h-[45vh]">
        <Image
          source={article.image ? { uri: article.image } : images.japan}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute inset-0 bg-black/30" />
      </View>

      {/* botones de navegación y guardado */}
      <SafeAreaView edges={['top']} className="absolute top-0 w-full z-10 flex-row justify-between px-4 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white/20 blur-md p-3 rounded-full"
        >
          <Image source={icons.backArrow} className="size-6" tintColor='white' />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/20 blur-md p-3 rounded-full">
          <Image source={icons.heart} className="size-6" tintColor='white' />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: '80%' }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white -mt-20 rounded-t-[35px] min-h-screen px-6 pt-8 pb-10 shadow-xl shadow-black-100">

          {/* categoría y timepo de publicación */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="bg-primary-100 px-3 py-1 rounded-full">
              <Text className="text-primary-300 text-xs font-rubik-bold uppercase tracking-wider">
                {article.category || 'Noticias'}
              </Text>
            </View>
            <Text className="text-black-200 text-xs font-rubik-medium">
              {new Date(article.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </Text>
          </View>

          {/* artículo completo */}
          <Text className="text-2xl font-rubik-bold text-black-300 leading-tight mb-6">
            {article.title}
          </Text>

          <View className="h-[1px] w-full bg-black-100/20 mb-6" />

          <Text className="text-base font-rubik-light text-black-300 leading-8 text-justify">
            {article.description}
          </Text>

          <Text className="text-base font-rubik-light text-black-300 leading-8 text-justify mt-4">
            {article.content}
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}

export default ArticleDetails
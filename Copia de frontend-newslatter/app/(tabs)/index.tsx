import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image, NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View
} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {ArticleCard} from "@/components/Cards";
import TopTab, {TabItem} from "@/components/TopTab";
import {useEffect, useRef, useState} from "react";
import {Link, useLocalSearchParams, useRouter} from "expo-router";
import {Article, NewsService} from "@/services/newsService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const navTabs = [
  { name: 'Tecnología', id: 'technology' },
  { name: 'Hoy', id: 'today' }, // "Variadas" al entrar
  { name: 'Negocios', id: 'business' },
];

const { width } = Dimensions.get('window');

export default function Index() {
  // para el router
  const { category } = useLocalSearchParams()
  const router = useRouter()
  const flatListRef = useRef<FlatList>(null);

  // asigno la categoria por defecto a today para mostrar las mas recientes
  const currentCategory = (category as string) || 'today'
  // recuperamos el index actual para la navegación
  const currentIndex = navTabs.findIndex(tab => tab.id === currentCategory);

  // estados para los articulos
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] =useState(true);

  const [user, setUser] = useState<any>(null)

  const loadNews = async () => {
    setIsLoading(true);
    const data = await NewsService.getAll();
    setNews(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadNews()
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const session = await AsyncStorage.getItem('user_session');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (e) {
      console.log("Entrando como invitado");
    }
  };

  /*const getFilteredNews = () => {
    // en el tab de today saldran todas las noticias
    if (currentCategory === 'today') return news;

    // Filtra por la categoría seleccionada (tecnología o negocios)
    return news.filter(item => item.category === currentCategory);
  };*/

  // como en el js para el manejo de scrolls
  const hadleScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>)=> {
    const scrollX = evt.nativeEvent.contentOffset.x;
    const i = Math.round(scrollX / width);

    if (i >= 0 && i < navTabs.length) {
      const nextCategory = navTabs[i].id;
      if (nextCategory !== currentCategory) {
        router.setParams({category: nextCategory});
      }
    }
  }

  // igual pero al presionar los botones del tabNav
  const handleTabPress = (tabId: string) => {
    const i = navTabs.findIndex(tab => tab.id === tabId);
    flatListRef.current?.scrollToIndex({ index: i, animated: true });
  }

  const renderTabContent = ({ item }: { item: TabItem }) => {
    const safeNews = Array.isArray(news) ? news : [];
    const filteredNews = item.id === 'today'
      ? safeNews : safeNews.filter(newsItem => newsItem.category?.toLowerCase() === item.id)

    return (
      <ScrollView
        style={{width}}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={{ width }} className='px-4'>
         <View className='my-4 flex-col justify-center items-center'>
           <Text className='text-xl font-rubik-bold text-black-300 capitalize'>
             {item.id === 'today' ? 'Noticias Destacadas' : item.name}
           </Text>
         </View>

         <View className='pb-32'>
           {filteredNews?.map((newsItem, i) => (
             <View
              key={newsItem.id}
              className={i !== 0 ? 'mt-6' : ''}
             >
               <ArticleCard
                 title={newsItem.title}
                 description={newsItem.description}
                 image={newsItem.image}
                 publishedAt={newsItem.publishedAt}
                 onPress={() => router.push(`/articles/${newsItem.id}`)}
               />
             </View>
           ))}
         </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <SafeAreaView className='flex-1' edges={['top']}>
      <View className='flex-1'>
        <View className='px-4'>
          {/* Header info de usuario y notificaciones */}
          <View className='flex flex-row items-center justify-between mt-2'>
            {/* Header info de usuario  */}
            <View className='flex flex-row'>
              <Image
                source={ user?.avatar ? { uri: user.avatar } : images.avatar }
                className='size-12 rounded-full'
              />
              <View className='flex flex-col items-start ml-2 justify-center'>
                <Text className='text-xs font-rubik text-black-100'>Buen dia</Text>
                <Text className='text-base font-rubik-medium text-black-300'>{user ? user.name : "Invitado"}</Text>
              </View>
            </View>
            <Image
              source={icons.bell}
              className='size-6'
            />
          </View>

          {/* barra de búsqueda*/}
          <View className='mt-2'>
            <Search />
            <Link href={'/subscribe'}>Suscripcion</Link>
          </View>

          <View className='mt-4'>
            <TopTab
              tabs={navTabs}
              onTabPress={handleTabPress}
            />
          </View>
        </View>

        {isLoading ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator className='text-primary-300' size='large' />
          </View>
        ) : (

        <FlatList
          ref={flatListRef}
          data={navTabs}
          renderItem={renderTabContent}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={hadleScroll}
          initialScrollIndex={currentIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index
          })}
          bounces={false}
        />
        )}

      </View>
    </SafeAreaView>
  );
}

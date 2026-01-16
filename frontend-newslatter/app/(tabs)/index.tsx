import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  FlatList,
  Image, NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {ArticleCard} from "@/components/Cards";
import TopTab, {TabItem} from "@/components/TopTab";
import {useRef, useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";

const news = [
  {
    id: '1',
    title: 'El mercado global se estabiliza tras anuncios de la FED',
    description: 'Los indicadores muestran una recuperación leve en skldfj sdfks dfsafs fasdfjk asdfj asjdf asf sdf sjdf sldj fasj dfasj dfasj fsñjdfasñjdfas',
    category: 'negocios', // Categoría importante
    image: images.newYork, // Asegúrate de tener una imagen genérica o usa images.japan
    published_at: '2025-01-15T10:30:00-06:00',
  },
  {
    id: '2',
    title: 'Nueva IA generativa rompe récords de velocidad',
    description: 'El modelo presentado hoy supera a sus predecesores en sdljfhsdf sdf asdfs asdfasd sadgas gkñjhfg h dgdjsfg ',
    category: 'tecnologia',
    image: images.japan,
    published_at: '2025-01-14T15:45:00-06:00',
  },
  {
    id: '3',
    title: 'Protestas en Europa: Lo que debes saber hoy',
    description: 'Miles de personas salen a las calles para exigir...',
    category: 'general',
    image: images.map,
    published_at: '2025-01-13T08:20:00-06:00',
  },
  {
    id: '4',
    title: 'Apple lanza nuevo dispositivo de realidad mixta',
    description: 'La compañía de Cupertino apuesta todo al metaverso...',
    category: 'tecnologia',
    image: images.japan,
    published_at: '2025-01-10T12:00:00-06:00',
  },
  {
    id: '5',
    title: 'Startup unicornio cae en bolsa un 20%',
    description: 'Las acciones de la empresa tecnológica sufrieron...',
    category: 'negocios',
    image: images.barChart,
    published_at: '2025-01-15T06:15:00-06:00',
  },
];

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
  const flatListtRef = useRef<FlatList>(null);

  // asigno la categoria por defecto a today para mostrar las mas recientes
  const currentCategory = (category as string) || 'today'
  // recuperamos el index actual para la navegación
  const currentIndex = navTabs.findIndex(tab => tab.id === currentCategory);


  const getFilteredNews = () => {
    // en el tab de today saldran todas las noticias
    if (currentCategory === 'today') return news;

    // Filtra por la categoría seleccionada (tecnologia o negocios)
    return news.filter(item => item.category === currentCategory);
  };

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
    flatListtRef.current?.scrollToIndex({ index: i, animated: true });
  }

  const renderTabContent = ({ item }: { item: TabItem }) => {
    const filteredNews = item.id === 'today' ? news : news.filter(newsItem => newsItem.category === item.id)

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
           {filteredNews.map((newsItem, i) => (
             <View
              key={newsItem.id}
              className={i !== 0 ? 'mt-6' : ''}
             >
               <ArticleCard
                 title={newsItem.title}
                 description={newsItem.description}
                 image={newsItem.image}
                 publishedAt={newsItem.published_at}
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
          <View className='flex flex-row items-center justify-between mt-4'>
            {/* Header info de usuario  */}
            <View className='flex flex-row'>
              <Image
                source={ images.avatar }
                className='size-12 rounded-full'
              />
              <View className='flex flex-col items-start ml-2 justify-center'>
                <Text className='text-xs font-rubik text-black-100'>Buen dia</Text>
                <Text className='text-base font-rubik-medium text-black-300'>BIBIGO</Text>
              </View>
            </View>
            <Image
              source={icons.bell}
              className='size-6'
            />
          </View>

          {/* barra de búsqueda*/}
          <Search />

          <View className='mt-4'>
            <TopTab
              tabs={navTabs}
              onTabPress={handleTabPress}
            />
          </View>
        </View>

        <FlatList
          ref={flatListtRef}
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
      </View>
    </SafeAreaView>
  );
}

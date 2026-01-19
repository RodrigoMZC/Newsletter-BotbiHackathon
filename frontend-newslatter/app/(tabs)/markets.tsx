import {useEffect, useRef, useState} from 'react'
import {MarketAsset, MarketService} from "@/services/marketService";
import {SafeAreaView} from "react-native-safe-area-context";
import MarketRow from "@/components/MarketRow";
import {
  ActivityIndicator,
  Dimensions,
  FlatList, NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import TopTab, {TabItem} from "@/components/TopTab";

const { width } = Dimensions.get('window');

const marketTabs = [
  { name: 'Acciones', id: 'stocks' },
  { name: 'Cripto', id: 'crypto' },
];

const Markets = () => {
  const [selectedTab, setSelectedTab] = useState<'stocks' | 'crypto'>('stocks');
  //const [data, setData] = useState<MarketAsset[]>([]);
  const [stocksData, setStocksData] = useState<MarketAsset[]>([]);
  const [cryptoData, setCryptoData] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const fetchData = async (type: 'stocks' | 'crypto', isRefresh = false) => {
    if (!isRefresh) {
      if (type === 'stocks' && stocksData.length > 0) return;
      if (type === 'crypto' && cryptoData.length > 0) return;
    }

    setLoading(true);
    const result = await MarketService.getMarkets(type);

    if (type === 'stocks') setStocksData(result);
    else setCryptoData(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab]);

  const handleTabPress = (id: string) => {
    const index = marketTabs.findIndex(tab => tab.id === id);
    setSelectedTab(id as 'stocks' | 'crypto');
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = evt.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);

    if (index >= 0 && index < marketTabs.length) {
      const newTab = marketTabs[index].id as 'stocks' | 'crypto';
      if (newTab !== selectedTab) {
        setSelectedTab(newTab);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(selectedTab, true);
    setRefreshing(false);
  };

  const renderTabContent = ({ item }: { item: TabItem }) => {
    const dataToShow = item.id === 'stocks' ? stocksData : cryptoData;
    const isCurrentTabLoading = loading && dataToShow.length === 0;

    return (
      <View style={{width}} className="px-4">
        {/* Spinner centrado si está cargando por primera vez */}
        {isCurrentTabLoading ? (
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size="large" color="#E11D48"/>
          </View>
        ) : (
          <FlatList
            data={dataToShow}
            keyExtractor={(marketItem) => marketItem.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item: marketItem}) => <MarketRow item={marketItem}/>}
            contentContainerStyle={{paddingBottom: 80}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E11D48']}/>
            }

            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-10 font-rubik">
                No hay datos disponibles.
              </Text>
            }
          />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1">
        <View className="px-4 mt-4 mb-2">
          <Text className="text-2xl font-rubik-bold text-black-300">Mercados</Text>
          <Text className="text-gray-500 font-rubik text-base">Tendencias en tiempo real</Text>
        </View>

        <View className="px-4 mt-2 mb-4">
          <TopTab
            tabs={marketTabs}
            onTabPress={handleTabPress}
            activeId={selectedTab}
          />
        </View>
        <FlatList
          ref={flatListRef}
          data={marketTabs}
          renderItem={renderTabContent}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index
          })}
          initialScrollIndex={0}
          bounces={false}
        />
      </View>
    </SafeAreaView>
  )
}
export default Markets

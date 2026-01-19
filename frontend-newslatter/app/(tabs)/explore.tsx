import {View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {Article, NewsService} from "@/services/newsService";
import {ArticleCard} from "@/components/Cards";
import icons from "@/constants/icons";
import Search from "@/components/Search";

const Explore = () => {
  const { query } = useLocalSearchParams<{query?: string}>()

  const [news, setNews] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(false)

  const fetchNews = async (pageNumber: number, searchTerm: string = '') => {
    if (pageNumber === 1) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      // Llamamos al servicio pasando la página y el término
      const data = await NewsService.getAll(pageNumber, searchTerm);

      if (data.length === 0) setHasMore(false);

      if (pageNumber === 1) {
        setNews(data);
        setHasMore(data.length >= 10);
      } else {
        setNews(prev => [...prev, ...data]);
        if (data.length < 10) setHasMore(false);
      }
    } catch (error) {
      console.error("Error buscando noticias:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    const searchQuery = Array.isArray(query) ? query[0] : query || '';
    fetchNews(1, searchQuery);
  }, [query]);

  const loadMore = () => {
    if (!isLoading && !isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      const searchQuery = Array.isArray(query) ? query[0] : query || '';
      fetchNews(nextPage, searchQuery);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <View className="px-4 mt-2 mb-4">
        <View className="flex flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Image
              source={icons.backArrow}
              className="size-5"
            />
          </TouchableOpacity>
          <Text className="text-xl font-rubik-bold text-black-300">Explorar</Text>
          <View className="w-5" />
        </View>
        <Search />
      </View>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E11D48" />
        </View>
      ):(
        <FlatList
          data={news}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}

          onEndReached={loadMore}
          onEndReachedThreshold={0.5}

          renderItem={({ item, index }) => (
            <View className={index !== 0 ? 'mt-6' : ''}>
              <ArticleCard
                title={item.title}
                description={item.description}
                image={item.image}
                publishedAt={item.publishedAt}
                onPress={() => router.push(`/articles/${item.id}`)}
              />
            </View>
          )}

          ListEmptyComponent={
            <View className="mt-10 items-center">
              <Text className="text-gray-400 font-rubik text-center">
                {query ? `No encontramos noticias sobre "${query}"` : "Escribe para buscar noticias"}
              </Text>
            </View>
          }

          ListFooterComponent={
            isLoadingMore ? (
              <View className="my-4">
                <ActivityIndicator size="small" className='text-primary-300' />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  )
}
export default Explore

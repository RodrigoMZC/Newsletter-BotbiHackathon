import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import {useEffect, useState} from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  onPress?: () => void;
}

const Search = ({ onPress }: Props) => {
  const params = useLocalSearchParams<{query?: string}>()
  const [search, setSearch] = useState(params.query || '')

  /*const debouncedSearch = useDebouncedCallback((text: string) => {
      router.setParams({query: text})
    }, 500)*/

  useEffect(() => {
    if (onPress) return

    const handler = setTimeout(() => {
      if (search !== params.query) router.setParams({ query: search})
    }, 500)

    return () => {
      clearTimeout(handler);
    };

  }, [search, onPress]);

  useEffect(() => {
    if (params.query !== undefined && params.query !== search) {
      setSearch(params.query);
    }
  }, [params.query]);


  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      className="flex flex-row items-center justify-between w-full py-2 px-2 rounded-lg bg-accent-100 border border-primary-100">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image
          source={icons.search}
          className="size-5"
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search for anything"
          placeholderTextColor="#8C8E98"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
          editable={!onPress}
          pointerEvents={onPress ? 'none' : 'auto'}
        />
      </View>

      <TouchableOpacity>
        <Image
          source={icons.filter} className="size-5"
        />
      </TouchableOpacity>
    </Container>
  )
}

export default Search
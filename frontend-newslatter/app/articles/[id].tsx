import { useLocalSearchParams } from "expo-router";
import {ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Article = () => {
    const { id } =useLocalSearchParams()
  return (
    <SafeAreaView className='h-full'>
      <View>
        <Text>Id {id}</Text>
      </View>

    </SafeAreaView>
  );
}

export default Article
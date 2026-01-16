import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Article = () => {
    const { id } =useLocalSearchParams()
  return (
    <View>
      <Text>Articulo {id}.</Text>
    </View>
  );
}

export default Article
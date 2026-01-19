import {View, Text, Image} from 'react-native'
import React from 'react'

interface Props {
  item: {
    name: string;
    symbol: string;
    price: number;
    change: number;
    logo?: string;
  };
}

const MarketRow = ( {item}: Props)  => {
  const isPositive = item.change >= 0;

  return (
    <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
      {/* IZQUIERDA: Logo y Nombres */}
      <View className="flex-row items-center gap-3">
        <View className="size-10 rounded-full bg-gray-50 items-center justify-center overflow-hidden border border-gray-100">
          {item.logo ? (
            <Image
              source={{ uri: item.logo }}
              className="size-6"
              resizeMode="contain"
            />
          ) : (
            <Text className="font-rubik-bold text-gray-400 text-xs">{item.symbol[0]}</Text>
          )}
        </View>

        <View>
          <Text className="text-base font-rubik-bold text-black-300">{item.symbol}</Text>
          <Text className="text-xs font-rubik text-gray-500 w-28" numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </View>

      {/* DERECHA: Precio y Cambio */}
      <View className="items-end">
        <Text className="text-base font-rubik-medium text-black-300">
          ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>

        <View className={`flex-row items-center px-2 py-1 rounded-md mt-1 ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          <Text className={`text-xs font-rubik-medium ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
            {isPositive ? '+' : ''}{item.change.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  )
}
export default MarketRow

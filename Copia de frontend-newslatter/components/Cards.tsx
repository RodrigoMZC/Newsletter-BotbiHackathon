import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void,
  title: string,
  description: string,
  publishedAt: string,
  image?: any
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className='flex flex-col items-start w-60 h-80 relative'
      >
        {/* Imagen de categoria si es que no encuentra imagen de la noticia */}
        <Image
          source={images.japan}
          className='size-full rounded-xl absolute bottom-0'
        />

        <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-xl font-rubik-bold text-white">Tecnologia</Text>
          </View>
          <Text className='text-xl font-rubik-extrabold text-white' numberOfLines={2}>
            TITULO largo de la noticia mas amarillista que vas a encontrar en todo este mundo sisi claroque si
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full <-50">
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">Tecnología</Text>
      </View>

      <Image
        source={images.japan}
        className="w-full h-40 rounded-lg"
      />

      <View className="flex flex-col mt-2">
        <Text
          className="text-base font-rubik-bold text-black-300"
        >
          Moder Apartment
        </Text>
        <Text className="text-sm font-rubik text-black-200">
          Gonzalez #230s Matamoros Coah.
        </Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">$7,000</Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const ArticleCard = ({onPress, title, description, image, publishedAt}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex flex-col w-full border-black-100'
      activeOpacity={0.8}
    >
      <View className='flex flex-col items-center'>
        <Text
          className='text-base font-rubik-bold text-black-300 mb-4'
          numberOfLines={2}
        >
          {title}
        </Text>
        <Image
          source={image}
          className='w-full h-48 rounded-md'
          resizeMode="cover"
        />
        <Text
          className='text-sm font-rubik text-black-200 mt-2'
          numberOfLines={4}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}


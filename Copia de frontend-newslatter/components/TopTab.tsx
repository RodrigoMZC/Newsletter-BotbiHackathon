import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import {Link, useLocalSearchParams} from "expo-router";

export interface TabItem {
  name: string;
  id: string;
}

interface Props {
  tabs: TabItem[];
  onTabPress?: (tabId: string) => void;
}

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onPress: (tabId: string) => void;
}


const TopTab = ({ tabs, onTabPress }: Props) => {
  const params = useLocalSearchParams();
  const activeCategory = params.category || 'today';

  const handlePress = (tabId: string) => {
    if (onTabPress) onTabPress(tabId);
  }

  return (
    <View className='items-center justify-center w-full'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex-row'
      >
        {tabs.map((tab) => {
          const isActive = activeCategory === tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              className='mr-6 pb-3 relative items-center justify-center'
              activeOpacity={0.7}
              onPress={() => handlePress(tab.id)}
            >
              <Text
                className={`text-base font-rubik ${isActive ? 'text-primary-300 font-rubik-bold' : 'text-black-200 font-rubik'}`}
              >
                {tab.name}
              </Text>
              {isActive && (
                <View className='absolute bottom-0 w-full h-[3px] bg-primary-300 rounded-full' />
              )}

            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
export default TopTab

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import React from 'react';
import {
  View,
} from 'react-native';
import "react-native-reanimated";


const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator);

export default function ExploreTabLayout() {
  return (
    <View style={{ paddingTop: 70, flex: 1}}>
      <MaterialTopTabs screenOptions={{
        tabBarStyle:{
          shadowOpacity: 0,
          backgroundColor: 'white,'
        }
      }}>
          <MaterialTopTabs.Screen name="Items Lent Out" />
          <MaterialTopTabs.Screen name="Currently Borrowing" />
      </MaterialTopTabs>
    </View>  
  );
}




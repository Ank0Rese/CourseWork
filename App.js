import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PromoListScreen from './screens/PromoListScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import GoodsListScreen from './screens/GoodsListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PromoList">
        <Stack.Screen 
          name="PromoList" 
          component={PromoListScreen} 
          options={{ title: 'Акції Varus' }} 
        />
        <Stack.Screen 
          name="CategoryList" 
          component={CategoryListScreen} 
          options={{ title: 'Категорії акцій' }} 
        />
        <Stack.Screen 
          name="GoodsList" 
          component={GoodsListScreen} 
          options={{ title: 'Товари' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
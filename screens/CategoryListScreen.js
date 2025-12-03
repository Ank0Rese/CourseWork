import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as ApiService from '../services/ApiService'; 

export default function CategoryListScreen({ route, navigation }) {
  const { promoId, promoName } = route.params;

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: promoName });

    ApiService.getCategoriesByPromoId(promoId)
      .then(data => {
        setCategories(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [promoId, promoName, navigation]); 

  const handleCategoryPress = (category) => {
    navigation.navigate('GoodsList', { categoryId: category.id, categoryName: category.uk });
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer} 
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.itemText}>{item.uk}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.loaderContainer}>
            <Text>Для цієї акції немає категорій</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemText: { fontSize: 18, fontWeight: 'bold' },
});
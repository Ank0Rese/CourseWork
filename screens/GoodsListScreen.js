import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as ApiService from '../services/ApiService'; 

export default function GoodsListScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;

  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: categoryName });

    ApiService.getGoodsByCategoryId(categoryId)
      .then(data => {
        setGoods(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, categoryName, navigation]); 

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderGoodsItem = ({ item }) => (
    <View style={styles.itemContainer}>
      
      {/* Картинка товару */}
      {item.img ? (
        <Image 
          source={{ uri: item.img }} 
          style={styles.productImage} 
          resizeMode="contain" 
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.body_value}</Text>
        
        {/* Дата закінчення акції */}
        {item.field_stopdate_value && (
           <Text style={styles.dateText}>
             До {item.field_stopdate_value.split(' ')[0]}
           </Text>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.newPrice}>{item.new_price} ₴</Text>
          {item.old_price && (
             <Text style={styles.oldPrice}>{item.old_price} ₴</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={goods}
        keyExtractor={item => item.nid ? item.nid.toString() : Math.random().toString()}
        renderItem={renderGoodsItem}
        ListEmptyComponent={() => (
          <View style={styles.loaderContainer}>
            <Text>Для цієї категорії немає товарів</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
  
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  }
});
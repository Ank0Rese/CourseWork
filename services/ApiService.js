import dbPromotions from '../data/promotions.json';
import dbCategories from '../data/categories.json';
import dbGoods from '../data/goods.json';

const fakeNetworkDelay = (ms) => new Promise(res => setTimeout(res, ms));

export const getPromoList = async (lang = 'ua') => {
  await fakeNetworkDelay(300);
  return dbPromotions;
};

export const getCategoriesByPromoId = async (promoId, lang = 'ua') => {
  await fakeNetworkDelay(400);
  
  const result = dbCategories[promoId];
  return result || [];
};

export const getGoodsByCategoryId = async (categoryId, lang = 'ua') => {
  await fakeNetworkDelay(500);
  
  const categoryData = dbGoods[categoryId];
  
  if (categoryData) {
    if (categoryData.array) return categoryData.array;
    if (categoryData.list) return categoryData.list;
  }

  return [];
};
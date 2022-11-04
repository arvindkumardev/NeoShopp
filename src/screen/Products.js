import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {data} from '../data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Products = () => {
  const [imagedata, setImagedata] = useState(false);
  const [itemid, setItemid] = useState();
  const navigation = useNavigation();

  const handleFav = item => {
    data.map(ele => {
      if (ele.id === item) {
        ele.favourite = ele.favourite ? false : true;
        setImagedata(imagedata ? false : true);
        setItemid(item);
      }
    });
  };

  const getAsyncStorageData = async () => {
    await AsyncStorage.setItem(
      'FavouriteValue',
      JSON.stringify(imagedata ? false : true),
    );
    await AsyncStorage.setItem('FavouriteId', JSON.stringify(itemid));
    console.log('3333', imagedata ? false : true);
    const valueData = await AsyncStorage.getItem('FavouriteValue');
    const valueId = await AsyncStorage.getItem('FavouriteId');
    if (valueId !== null || valueId !== undefined) {
      data.map(ele => {
        if (ele.id === valueId) {
          ele.favourite = ele.favourite ? false : true;
        }
        setImagedata(valueData);
      });
    }
    setImagedata(JSON.parse(valueData));
  };

  useEffect(() => {
    getAsyncStorageData();
  }, []);

  const renderList = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('ProductDetails', {Item: item})}>
          <View style={styles.productImageView}>
            <Image
              style={styles.productImage}
              source={{
                uri: `${item.product_images}`,
              }}
            />
          </View>
          <View style={styles.flex2}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productProducer}>{item.producer}</Text>
            <Text style={styles.productCost}>Rs. {item.cost}</Text>
          </View>
          <TouchableOpacity
            style={styles.favouriteImage}
            onPress={() => handleFav(item.id)}>
            <Image
              style={styles.favImg}
              source={
                item.favourite === true
                  ? require('../asset/images/ic_fav_filled.png')
                  : require('../asset/images/ic_fav_unfilled.png')
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.borderView} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderList}
      />
      <TouchableOpacity onPress={() => getAsyncStorageData()}>
        <Text>Ram</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  productImageView: {
    flex: 1,
    marginTop: 10,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  flex2: {
    flex: 2,
  },
  productName: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  productProducer: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#666666',
  },
  productCost: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  favouriteImage: {
    flex: 1,
    marginTop: 40,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  favImg: {
    width: 50,
    height: 50,
  },
  borderView: {
    borderBottomWidth: 0.5,
    marginTop: 10,
    borderBottomColor: '#d9d9d9',
  },
});

export default Products;

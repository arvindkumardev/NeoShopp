import React, {useLayoutEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

const ProductDetails = () => {
  const route = useRoute();
  const {Item} = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const title = 'Products Details';
    navigation.setOptions({title});
  });

  return (
    <View>
      <View style={styles.imageView}>
        <Image
          style={styles.productImg}
          source={{
            uri: `${Item.product_images}`,
          }}
        />
      </View>
      <View style={styles.left}>
        <View style={styles.productView}>
          <View style={styles.flex4}>
            <Text style={styles.productName}>{Item.name}</Text>
            <Text style={styles.productProducer}>{Item.producer}</Text>
          </View>
          <View style={styles.flex1}>
            <Image
              style={styles.productTopImg}
              source={
                Item.favourite === true
                  ? require('../asset/images/ic_fav_filled.png')
                  : require('../asset/images/ic_fav_unfilled.png')
              }
            />
          </View>
        </View>
        <View style={styles.costMainView}>
          <View style={styles.flex1}>
            <Text style={styles.costRating}>Rs. {Item.cost}</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.costRating}>Rating {Item.rating}</Text>
          </View>
        </View>
        <Text style={styles.productDes}>{Item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    alignItems: 'center',
    margin: 10,
  },
  productImg: {
    width: 350,
    height: 200,
  },
  left: {
    marginLeft: 20,
  },
  productView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  flex4: {
    flex: 4,
  },
  flex1: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productProducer: {
    fontSize: 18,
    marginTop: 10,
    color: '#666666',
  },
  productTopImg: {
    width: 50,
    height: 50,
  },
  costMainView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  costRating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  productDes: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default ProductDetails;

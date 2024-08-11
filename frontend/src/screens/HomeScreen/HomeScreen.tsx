import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import CustomButton from '../../components/customButton';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {
  fetchAllVouchers,
  fetchGetUserPurchasedVouchers,
} from '../../libs/api/fetchVouchers';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RootStackParamList} from '../../../types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PurchaseVoucher',
  'MyVoucher'
>;

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const dispatch = useDispatch<AppDispatch>();

  const onPurchaseVouchersPressed = async () => {
    await dispatch(fetchAllVouchers());
    navigation.navigate('PurchaseVoucher');
  };

  const onViewMyVouchersPressed = async () => {
    await dispatch(fetchGetUserPurchasedVouchers(user._id));
    navigation.navigate('MyVoucher');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome, {user.name}</Text>
      <Text>Balance: {user.balance}</Text>
      <Text>Purchased Vouchers: {user.purchased_vouchers.length}</Text>

      <CustomButton
        text={'Purchase Vouchers'}
        onPress={onPurchaseVouchersPressed}
      />
      <CustomButton
        text={'View My Vouchers'}
        onPress={onViewMyVouchersPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    margin: 10,
    fontSize: 24,
  },
  title: {
    fontWeight: 'bold',
    color: '#051C60',
  },
});

export default HomeScreen;

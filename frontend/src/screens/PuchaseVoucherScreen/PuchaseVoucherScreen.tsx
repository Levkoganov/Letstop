import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import React from 'react';
import CustomButton from '../../components/customButton/CustomButton';
import {fetchBuyVoucher} from '../../libs/api/fetchVouchers';
import {updateUserData} from '../../store/userSlice';
import {updateVouchersData} from '../../store/voucherSlice';
import {IPurchaseVoucherInput} from '../../../types';

const PurchaseVoucherScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {allVouchers} = useSelector((state: RootState) => state.vouchers);
  const {_id, name, balance} = useSelector((state: RootState) => state.user);

  const onPurchasePressed = async (data: IPurchaseVoucherInput) => {
    const {payload} = await dispatch(fetchBuyVoucher(data));
    if (payload.message) {
      Alert.alert(payload.message);
    } else {
      dispatch(
        updateUserData({
          purchased_vouchers: payload.user.purchased_vouchers,
          balance: payload.user.balance,
        })
      );

      dispatch(
        updateVouchersData({
          voucherId: payload.voucher._id,
          amount: payload.voucher.amount,
        })
      );

      Alert.alert('Voucher purchased!');
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{`Welcome, ${name}`}</Text>
          <Text style={styles.title}>{`My balance: ${balance}`}</Text>
        </View>
        {allVouchers.map(res => (
          <View key={res._id} style={styles.card}>
            <Text>{`Company: ${res.company}`}</Text>
            <Text>{`Cost: ${res.cost}`}</Text>
            <Text>{`Amount: ${res.amount}`}</Text>

            <CustomButton
              text={'Purchase Voucher'}
              onPress={() =>
                onPurchasePressed({userId: _id, voucherId: res._id})
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    margin: 10,
    fontSize: 24,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#051C60',
  },
  button: {
    fontWeight: 'bold',
    color: '#051C60',
  },
});

export default PurchaseVoucherScreen;

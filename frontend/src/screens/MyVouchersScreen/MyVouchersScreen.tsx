import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import React from 'react';
import {RootState} from '../../store/store';

const MyVouchersScreen = () => {
  const {myVouchers} = useSelector((state: RootState) => state.vouchers);
  const {name} = useSelector((state: RootState) => state.user);

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>{`${name} Vouchers`}</Text>

        {myVouchers.length === 0 ? (
          <Text style={styles.noVouchersText}>No vouchers available.</Text>
        ) : (
          myVouchers.map((res, idx) => (
            <View key={idx} style={styles.card}>
              <Text>{`Company: ${res.company}`}</Text>
              <Text>{`Cost: ${res.cost}`}</Text>
            </View>
          ))
        )}
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
  title: {
    fontWeight: 'bold',
    color: '#051C60',
    marginBottom: 20,
  },
  noVouchersText: {
    // color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
});

export default MyVouchersScreen;

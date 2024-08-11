import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import PurchaseVoucherScreen from '../screens/PuchaseVoucherScreen';
import MyVouchersScreen from '../screens/MyVouchersScreen';

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="PurchaseVoucher"
          component={PurchaseVoucherScreen}
        />
        <Stack.Screen name="MyVoucher" component={MyVouchersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FieldValues, useForm} from 'react-hook-form';
import {AppDispatch} from '../../store/store';
import {fetchLoggedInUser} from '../../libs/api/fetchUsers';
import {RootStackParamList} from '../../../types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignInScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const onSignInPressed = async (data: FieldValues) => {
    try {
      const {payload} = await dispatch(fetchLoggedInUser(data));
      if (payload.message && !payload.isLoading) {
        Alert.alert(payload.message);
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRegisterPressed = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={style.root}>
      <Text style={style.title}>Sign in</Text>
      <CustomInput
        name={'name'}
        control={control}
        placeholder={'Username'}
        secureTextEntry={false}
      />
      <CustomInput
        name={'password'}
        control={control}
        placeholder={'Password'}
        secureTextEntry={true}
      />

      <CustomButton text={'Sign in'} onPress={handleSubmit(onSignInPressed)} />
      <CustomButton
        text={'Don`t have an account? Register now.'}
        onPress={onRegisterPressed}
        type={'TERTIARY'}
      />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
});

export default SignInScreen;

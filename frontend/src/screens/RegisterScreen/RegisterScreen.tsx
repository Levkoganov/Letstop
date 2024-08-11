import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FieldValues, useForm} from 'react-hook-form';
import axios from 'axios';
import {RootStackParamList} from '../../../types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {control, handleSubmit} = useForm();

  const onRegisterPressed = async (payload: FieldValues) => {
    try {
      const {data, status} = await axios.post('users', payload);

      if (status === 201) {
        navigation.navigate('SignIn');
        console.warn('Register Success!');
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={style.root}>
      <Text style={style.title}>Create an account</Text>
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

      <CustomInput
        name={'balance'}
        control={control}
        placeholder={'Balance'}
        secureTextEntry={false}
        keyboardType="numeric"
      />

      <CustomButton
        text={'Register'}
        onPress={handleSubmit(onRegisterPressed)}
      />
      <CustomButton
        text={'Have an account? Login in.'}
        onPress={onLoginPressed}
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

export default RegisterScreen;

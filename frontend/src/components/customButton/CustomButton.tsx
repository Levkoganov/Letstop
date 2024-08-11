import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {ButtonType} from '../../../types';

interface IProps {
  text: string;
  onPress: () => void;
  type?: ButtonType;
}

const CustomButton = ({onPress, text, type = 'PRIMARY'}: IProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[style.container, style[`container_${type}`]]}>
      <Text style={[style[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },
  container_TERTIARY: {},

  text_PRIMARY: {fontWeight: 'bold', color: 'white'},
  text_TERTIARY: {fontWeight: 'bold', color: 'gray'},
});

export default CustomButton;

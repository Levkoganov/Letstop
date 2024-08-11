import {View, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

interface IProps {
  name: string;
  control: any;
  placeholder: string;
  secureTextEntry: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const CustomInput = ({
  name,
  control,
  placeholder,
  secureTextEntry,
  keyboardType,
}: IProps) => {
  return (
    <View style={style.container}>
      <Controller
        control={control}
        name={name}
        render={({field: {value, onChange, onBlur}}) => (
          <TextInput
            style={style.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;

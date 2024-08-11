import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import './src/utils/axiosConfig';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;

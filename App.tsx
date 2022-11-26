import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Editor from './screens/editor';
import ActionCreator from './screens/action-creator';
import {AppProvider} from './context/context';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Editor" component={Editor} />
            <Stack.Screen name="ActionCreator" component={ActionCreator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default App;

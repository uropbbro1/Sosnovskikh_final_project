import Register from './components/Register';
import Login from './components/Login';
import HypothecCalculator from './components/HypothecCalculator';
import Favorite from './components/FavoriteHypothec';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: "Регистрация"}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: "Авторизация"}}
        />
        <Stack.Screen
          name="HypothecCalculator"
          component={HypothecCalculator}
          options={{title: "Калькулятор", headerLeft: ()=> null}}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{title: "Избраное"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

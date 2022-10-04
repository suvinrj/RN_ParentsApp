import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, SplashScreen, Great, Menu, video, Notification, MainLoc} from '../pages';

import SignUp from '../pages/SignUp';


const Stack = createNativeStackNavigator();

const Router = () => {
  return (
        <Stack.Navigator>


        <Stack.Screen name="SplashScreen" 
        component={SplashScreen} 
        options={{headerShown: false}} 
        />
        <Stack.Screen name="SignIn" 
        component={SignIn} 
        options={{headerShown: false}} 
        />
        <Stack.Screen name="SignUp" 
        component={SignUp} 
        options={{headerShown: false}} 
        />
        <Stack.Screen name="Menu" 
        component={Menu} 
        options={{headerShown: false}} 
        />
     
        <Stack.Screen name="Notification" 
        component={Notification} 
        options={{headerShown: false}} 
        />    
        <Stack.Screen name="MainLoc" 
        component={MainLoc} 
        options={{headerShown: false}} 
        />    
    </Stack.Navigator>
    
  )
}

export default Router

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateExam from '../screens/CreateExam';
import Exam from '../screens/Exam';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MyExams from '../screens/MyExams'; // Importar la nueva pantalla MyExams
import ExamDetails from '../screens/ExamDetails'; // Importar la nueva pantalla ExamDetails

const Stack = createNativeStackNavigator();

export default function AppNavigation () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="CreateExam" component={CreateExam} />
        <Stack.Screen options={{headerShown: false}} name="Exam" component={Exam} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="MyExams" component={MyExams} />
        <Stack.Screen name="ExamDetails" component={ExamDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

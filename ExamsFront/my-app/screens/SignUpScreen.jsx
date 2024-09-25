import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password && firstname && lastname && country) {
      ///https://10.51.7.90:8080/auth/register,http://192.168.18.213:8080/auth/register
      try {
        const response = await fetch('https://10.51.7.90:8080/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password,
            firstname,
            lastname,
            country,
          }),
        });

        if (response.ok) {
          const { token } = await response.json();
          await AsyncStorage.setItem('token', token);
          navigation.navigate('SignIn');
        } else {
          Alert.alert('Registration Failed', 'Please check your details and try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Registration Failed', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex justify-between h-full mx-4">
          <View>
            <View className="relative">
              <View className="absolute top-0 left-0 z-10">
                <BackButton />
              </View>
              <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
            </View>
            <View className="flex-row justify-center my-3 mt-5">
              <Image className="h-80 w-80" source={require('../images/Design/Design/signup.png')} />
            </View>
            <View className="space-y-2 mx-2">
              <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="p-4 bg-white rounded-full mb-5"
                keyboardType="email-address"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
              <TextInput
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                className="p-4 bg-white rounded-full mb-5"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>First Name</Text>
              <TextInput
                value={firstname}
                onChangeText={setFirstname}
                className="p-4 bg-white rounded-full mb-5"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>Last Name</Text>
              <TextInput
                value={lastname}
                onChangeText={setLastname}
                className="p-4 bg-white rounded-full mb-5"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>Country</Text>
              <TextInput
                value={country}
                onChangeText={setCountry}
                className="p-4 bg-white rounded-full mb-5"
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: colors.button }} className="my-6 rounded-full">
            <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

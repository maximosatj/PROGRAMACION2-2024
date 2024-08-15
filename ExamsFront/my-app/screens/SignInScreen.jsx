import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';


export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (email && password) {
      // good to go
      navigation.goBack();
      navigation.navigate('Welcome');
    } else {
      // show error
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign In</Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-80 w-80" source={require('../images/Design/Design/login.png')} />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="p-4 bg-white rounded-full mb-5"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={value => setPassword(value)}
              className="p-4 bg-white rounded-full mb-5"
            />
            <TouchableOpacity className="flex-row justify-end">
              <Text>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: colors.button }} className="my-6 rounded-full">
          <Text className="text-center text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

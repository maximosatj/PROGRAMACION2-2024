import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import ScreenWrapper from "../components/ScreenWrapper";
import { FlatList } from 'react-native-gesture-handler';
import EmptyList from '../components/emptyList';
import { useNavigation } from '@react-navigation/native';
import { tailwind } from 'nativewind'; // Importa el helper tailwind

const items = [
    { id: '1', place: 'Seiri', country: 'Clasificar' },
    { id: '2', place: 'Seiton', country: 'Poner en orden' },
    { id: '3', place: 'Seiso', country: 'Pulir' },
    { id: '4', place: 'Seiketsu', country: 'Estandarizar' },
    { id: '5', place: 'Shitsuke', country: 'Mantener' },
];

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleCreateExamPress = () => {
        navigation.navigate('CreateExam');
    };

    const handleMyExamsPress = () => {
        navigation.navigate('MyExams'); // Navegar a MyExams.jsx
    };

    return (
        <ScreenWrapper className="flex-1">
            <View className="flex-row justify-between">
                <Text className=" font-bold text-3xl shadow-sm text-gray-900">Exams</Text>
                <TouchableOpacity className="p-2 bg-white border border-gray-300">
                    <Text className="text-gray-900">Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-5">
                <Image source={require('../images/Design/Design/banner.png')} style={{ width: 340, height: 200 }} />
            </View>
            <View className="px-4 space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text class="font-bold text-3xl text-gray-900">¿Qué son las 5S?</Text>
                    <TouchableOpacity onPress={handleCreateExamPress} className="p-2 bg-white border border-gray-300 rounded-full">
                        <Text className="text-gray-900">Crear Examen</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 430 }}>
                    <FlatList
                        data={items}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList />}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        style={{ marginHorizontal: 4 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="bg-white p-3 rounded-xl mb-6 shadow-sm">
                                <View>
                                    <Image 
                                        source={require('../images/Design/Design/1.png')} 
                                        style={{ width: 144, height: 144, marginBottom: 8 }} 
                                    />
                                    <Text className="font-bold text-gray-900">{item.place}</Text>
                                    <Text className="text-sm text-gray-600">{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {/* Botón para ir a la pantalla MyExams */}
                <TouchableOpacity 
                    onPress={handleMyExamsPress}
                    className="p-3 bg-blue-500 rounded-lg shadow-lg"
                    style={{ marginTop: 16 }}>
                    <Text className="text-white font-bold text-center">Ver Mis Exámenes</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
}

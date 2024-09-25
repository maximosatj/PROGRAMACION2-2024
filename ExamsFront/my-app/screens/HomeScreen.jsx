import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from "../components/ScreenWrapper";
import { FlatList } from 'react-native-gesture-handler';
import EmptyList from '../components/emptyList';
import { useNavigation } from '@react-navigation/native';

const items = [
    { id: '1', place: 'Seiri', country: 'Clasificar', description: 'Separar lo necesario de lo innecesario.' },
    { id: '2', place: 'Seiton', country: 'Poner en orden', description: 'Organizar los elementos para fácil acceso.' },
    { id: '3', place: 'Seiso', country: 'Pulir', description: 'Mantener el lugar limpio y en orden.' },
    { id: '4', place: 'Seiketsu', country: 'Estandarizar', description: 'Crear estándares para mantener la limpieza.' },
    { id: '5', place: 'Shitsuke', country: 'Mantener', description: 'Asegurar el cumplimiento y la disciplina.' },
];

export default function HomeScreen() {
    const [selectedItem, setSelectedItem] = useState(null); // Estado para manejar el ítem seleccionado
    const [modalVisible, setModalVisible] = useState(false); // Estado para manejar la visibilidad del modal
    const navigation = useNavigation();

    const handleCreateExamPress = () => {
        navigation.navigate('CreateExam');
    };

    const handleMyExamsPress = () => {
        navigation.navigate('MyExams');
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
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
                            <TouchableOpacity 
                                className="bg-white p-3 rounded-xl mb-6 shadow-sm"
                                onPress={() => openModal(item)} // Al presionar, abre el modal con el ítem seleccionado
                            >
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
                <TouchableOpacity 
                    onPress={handleMyExamsPress}
                    className="p-3 bg-blue-500 rounded-lg shadow-lg"
                    style={{ marginTop: 16 }}>
                    <Text className="text-white font-bold text-center">Ver Mis Exámenes</Text>
                </TouchableOpacity>
            </View>

            {/* Modal para mostrar más información */}
            {selectedItem && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={closeModal} // Cerrar el modal al presionar atrás
                >
                    <View className="flex-1 justify-center items-center bg-white bg-opacity-50">
                        <View className="bg-white p-6 rounded-lg w-3/4">
                            <Text className="font-bold text-xl text-gray-900">{selectedItem.place}</Text>
                            <Text className="text-gray-600 mt-2">{selectedItem.description}</Text>
                            <TouchableOpacity 
                                onPress={closeModal}
                                className="p-3 bg-blue-500 rounded-lg shadow-lg mt-4"
                            >
                                <Text className="text-white font-bold text-center">Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </ScreenWrapper>
    );
}

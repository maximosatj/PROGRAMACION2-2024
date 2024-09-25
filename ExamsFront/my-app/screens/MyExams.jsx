import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tailwind } from 'nativewind';

export default function MyExams() {
    const navigation = useNavigation();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga
    const [error, setError] = useState(''); // Para manejar errores

    useEffect(() => {
        const fetchExams = async () => {
            // 10.51.7.90
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No se encontró el token de autenticación');
                    return;
                }
                ///https://10.51.7.90:8080/exams,http://192.168.18.213:8080/exams
                const response = await axios.get('https://10.51.7.90:8080/exams', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
                    },
                });

                // Verifica los datos aquí
                console.log('Exámenes obtenidos:', response.data);

                // Ordena los exámenes por id en orden descendente
                const sortedExams = response.data.sort((a, b) => b.id - a.id);
                setExams(sortedExams);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exams:', error.response || error.message);
                setError('No se pudieron obtener los exámenes');
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    const handleExamPress = (examId) => {
        navigation.navigate('ExamDetails', { examId });
    };

    if (loading) {
        return (
            <ScreenWrapper className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </ScreenWrapper>
        );
    }

    if (error) {
        return (
            <ScreenWrapper className="flex-1 justify-center items-center">
                <Text className="text-red-500">{error}</Text>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper className="flex-1">
            <View className="px-4 py-4">
                <Text className="text-2xl font-bold mb-4">Mis Exámenes</Text>
                <FlatList
                    data={exams}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            className="bg-white p-3 rounded-xl mb-4 shadow-sm"
                            onPress={() => handleExamPress(item.id)}>
                            <Text className="font-bold text-gray-900">Empresa: {item.companyName}</Text>
                            <Text className="text-gray-600">Fecha: {item.examDate}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScreenWrapper>
    );
}

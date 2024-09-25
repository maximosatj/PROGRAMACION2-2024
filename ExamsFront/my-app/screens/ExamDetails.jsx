import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import ScreenWrapper from "../components/ScreenWrapper";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExamDetails() {
    const route = useRoute();
    const { examId } = route.params;
    const [examDetails, setExamDetails] = useState(null);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No se encontró el token de autenticación');
                    return;
                }

          
                ///https://10.51.7.90:8080/exams/${examId},http://192.168.18.213:8080/exams/${examId}
                const response = await axios.get(`https://10.51.7.90:8080/exams/${examId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
                    },
                });
                setExamDetails(response.data);
            } catch (error) {
                console.error('Error fetching exam details:', error.response || error.message);
                Alert.alert('Error', 'No se pudieron obtener los detalles del examen');
            }
        };

        fetchExamDetails();
    }, [examId]);

    if (!examDetails) {
        return (
            <ScreenWrapper>
                <Text>Cargando detalles del examen...</Text>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <View className="px-4 py-4">
                <Text className="text-2xl font-bold mb-4">Detalles del Examen</Text>
                <Text className="text-xl font-semibold">Empresa: {examDetails.companyName}</Text>
                <Text className="text-lg">Fecha: {examDetails.examDate}</Text>
                <FlatList
                    data={examDetails.questions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="mt-4">
                            <Text className="font-bold">{item.questionText}</Text>
                            <Text>Respuesta: {item.selectedAnswer}</Text>
                        </View>
                    )}
                />
            </View>
        </ScreenWrapper>
    );
}

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateExam = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [previousExam, setPreviousExam] = useState(false);
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No se encontró el token de autenticación');
          return;
        }

        const response = await axios.get('http://192.168.18.213:8080/client/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          const simplifiedClients = response.data.map(client => ({
            id: client.id,
            name: client.name,
            email: client.email,
          }));
          setClients(simplifiedClients);
        } else {
          console.error("Expected an array but got:", response.data);
          Alert.alert('Error', 'La respuesta no es un array');
        }
      } catch (error) {
        console.error('Error obteniendo los clientes:', error.response || error.message);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 403) {
            Alert.alert('Error', 'Acceso prohibido. Verifica tu token de autenticación.');
          } else {
            Alert.alert('Error', `Error al obtener los clientes: ${data.message || error.message}`);
          }
        } else {
          Alert.alert('Error', 'Error desconocido al obtener los clientes.');
        }
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async () => {
    if (!companyName || !examDate || clientId === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return;
      }

      console.log("Enviando datos:", {
        companyName,
        examDate,
        previousExam,
        client: { id: Number(clientId) }
      });

      const response = await axios.post('http://192.168.18.213:8080/exams', {
        companyName,
        examDate,
        previousExam,
        client: { id: Number(clientId) },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const examId = response.data.id;
      navigation.navigate('Exam', { examId });

      Alert.alert('Éxito', 'Examen creado con éxito');
      setCompanyName('');
      setExamDate('');
      setClientId('');
      setPreviousExam(false);
    } catch (error) {
      console.error('Error creando el examen:', error.response || error.message);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
          Alert.alert('Error', 'Acceso prohibido. Verifica tu token de autenticación.');
        } else {
          Alert.alert('Error', `Error al crear el examen: ${data.message || error.message}`);
        }
      } else {
        Alert.alert('Error', 'Error desconocido al crear el examen.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre de la empresa"
        value={companyName}
        onChangeText={setCompanyName}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha del examen (MM-DD)"
        value={examDate}
        onChangeText={setExamDate}
        style={styles.input}
      />
      <Picker
        selectedValue={clientId}
        onValueChange={(itemValue) => {
          setClientId(itemValue);
          const selectedClient = clients.find(client => client.id.toString() === itemValue);
          setClientName(selectedClient ? selectedClient.name : '');
        }}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un cliente" value="" />
        {clients.map(client => (
          <Picker.Item key={client.id} label={client.name} value={client.id.toString()} />
        ))}
      </Picker>
      <Button
        title={previousExam ? "Examen previo" : "Nuevo examen"}
        onPress={() => setPreviousExam(!previousExam)}
      />
      <Button title="Crear Examen" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 8,
  },
  picker: {
    marginBottom: 10,
  },
});

export default CreateExam;

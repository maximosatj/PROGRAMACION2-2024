import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const CreateExam = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [previousExam, setPreviousExam] = useState(false);
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);

  // Función para obtener los clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://192.168.18.213:8080/client/getall');
        console.log("Response data:", response.data); // Verifica la respuesta

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
        Alert.alert('Error', 'No se pudieron obtener los clientes');
      }
    };

    fetchClients();
  }, []);

  // Función para enviar los datos del examen al backend
  const handleSubmit = async () => {
    if (!companyName || !examDate || clientId === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://192.168.18.213:8080/exams', {
        companyName,
        examDate,
        previousExam,
        client: { id: Number(clientId) }, // Convierte el ID a número
      });

      // Obtener el ID del examen creado
      const examId = response.data.id;

      // Redirigir a la pantalla Exam con el ID del examen
      navigation.navigate('Exam', { examId });

      Alert.alert('Éxito', 'Examen creado con éxito');
      // Limpia los campos después de la creación
      setCompanyName('');
      setExamDate('');
      setClientId('');
      setPreviousExam(false);
    } catch (error) {
      console.error('Error creando el examen:', error.response || error.message);
      Alert.alert('Error', 'No se pudo crear el examen');
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
        onValueChange={(itemValue) => setClientId(itemValue)}
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

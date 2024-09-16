package com.example.Exams.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getClients() {
        // Convertir Iterable a List
        return StreamSupport.stream(clientRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public boolean deleteClient(Long id) {
        try {
            clientRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }


    public Client updateClient(Client request, Long id) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            Client clientToUpdate = client.get();
            clientToUpdate.setName(request.getName());
            clientToUpdate.setEmail(request.getEmail());
            return clientRepository.save(clientToUpdate);
        } else {
            return null;
        }
    }
}

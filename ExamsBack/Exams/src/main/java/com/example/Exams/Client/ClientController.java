package com.example.Exams.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/getall")
    public ResponseEntity<List<Client>> getClients() {
        List<Client> clients = clientService.getClients();
        System.out.println("Clients: " + clients); // Verifica el contenido
        return ResponseEntity.ok(clients);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id") Long id) {
        Optional<Client> client = clientService.getClientById(id);
        return client.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/save")
    public ResponseEntity<Client> saveClient(@RequestBody Client client) {
        Client savedClient = clientService.saveClient(client);
        return ResponseEntity.ok(savedClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") Long id) {
        boolean ok = clientService.deleteClient(id);
        if (ok) {
            return ResponseEntity.ok("User with Id " + id + " has been deleted");
        } else {
            return ResponseEntity.status(500).body("Error, User with Id " + id + " has not been deleted");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@RequestBody Client request, @PathVariable("id") Long id) {
        Client updatedClient = clientService.updateClient(request, id);
        if (updatedClient != null) {
            return ResponseEntity.ok(updatedClient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

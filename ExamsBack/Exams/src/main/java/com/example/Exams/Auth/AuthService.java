package com.example.Exams.Auth;

import com.example.Exams.Client.Client;
import com.example.Exams.Client.ClientRepository;
import com.example.Exams.Jwt.JwtService;
import com.example.Exams.Client.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ClientRepository clientRepository; // Cambiado de UserRepository a ClientRepository
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        // Autenticamos al cliente
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // Buscamos al cliente por username (email en este caso)
        Client client = clientRepository.findByEmail(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        // Generamos el token JWT
        String token = jwtService.getToken(client);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        // Crear un nuevo cliente
        Client client = Client.builder()
                .name(request.getUsername()) // Usamos username como nombre de usuario
                .email(request.getUsername()) // El email actúa como nombre de usuario
                .password(passwordEncoder.encode(request.getPassword())) // Encriptamos la contraseña
                .role(Role.USER) // Asignamos el rol predeterminado
                .build();

        // Guardamos el nuevo cliente en la base de datos
        clientRepository.save(client);

        // Devolvemos el token generado
        return AuthResponse.builder()
                .token(jwtService.getToken(client))
                .build();
    }
}

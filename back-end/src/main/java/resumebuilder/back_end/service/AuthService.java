package resumebuilder.back_end.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import resumebuilder.back_end.domain.dto.AuthRequestDto;
import resumebuilder.back_end.domain.utils.JwtUtil;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public String authenticate(AuthRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // Get user details after successful authentication
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate JWT
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}

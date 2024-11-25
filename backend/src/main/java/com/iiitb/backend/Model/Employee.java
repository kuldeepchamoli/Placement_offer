package com.iiitb.backend.Model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employee_id;

    private String username;

    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private String title;

    @ManyToOne
    @JoinColumn(name= "department", referencedColumnName = "department_id")
    private Department department;

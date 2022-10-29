package com.karalash.ukrcontent.model.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user_info")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "avatar_path")
    private String avatarPath;

    @Column(name = "is_admin")
    private int isAdmin;
}

package com.karalash.ukrcontent.model.entities;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "gallery")
@Data
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "date_time")
    private Timestamp dateTime;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;
}

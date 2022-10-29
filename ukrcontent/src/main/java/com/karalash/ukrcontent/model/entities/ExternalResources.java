package com.karalash.ukrcontent.model.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "external_resources")
@Data
public class ExternalResources {
    @Id
    private int id;

    @Column(name = "youtube")
    private String youtube;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "twitter")
    private String twitter;

    @Column(name = "telegram")
    private String telegram;

    @Column(name = "tiktok")
    private String tiktok;

    @Column(name = "browse_link")
    private String browse_link;

    @OneToOne(fetch = FetchType.LAZY) //
    @MapsId
    @JoinColumn(name = "id")  //
    private Content content;
}

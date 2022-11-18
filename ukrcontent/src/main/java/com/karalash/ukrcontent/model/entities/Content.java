package com.karalash.ukrcontent.model.entities;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "content")
@Data
@ToString(exclude = {"tags"})
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "date_time")
    private Timestamp dateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "content") //orphanRemoval = true
    private Set<Gallery> images = new HashSet<>();

    @OneToMany(mappedBy = "content") //orphanRemoval = true
    private Set<Comment> comments = new HashSet<>();

    @OneToOne(mappedBy = "content", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private ExternalResources externalResources;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "content_tag",
            joinColumns = { @JoinColumn(name = "content_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") })
    private List<Tag> tags;

    public void setExternalResources(ExternalResources externalResources) {
        this.externalResources = externalResources;
        this.externalResources.setContent(this); // setting the parent class as the value for the child instance
    }

//    public Content(int id, String title, String description, Timestamp dateTime, User user, Category category, Set<Gallery> images, Set<Comment> comments, ExternalResources externalResources) {
//        this.id = id;
//        this.title = title;
//        this.description = description;
//        this.dateTime = dateTime;
//        this.user = user;
//        this.category = category;
//        this.images = images;
//        this.comments = comments;
//        this.externalResources = externalResources;
//    }
}

package com.karalash.ukrcontent.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tag")
@Data
@ToString(exclude = {"contents"})
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "label")
    private String label;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "tags")
    @JsonIgnore
    private List<Content> contents;

//    public Tag() {
//    }
//
//    public Tag(int id, String label) {
//        this.id = id;
//        this.label = label;
//    }

    public void addContent(Content content) {
        contents.add(content);
        content.getTags().add(this);
    }
}

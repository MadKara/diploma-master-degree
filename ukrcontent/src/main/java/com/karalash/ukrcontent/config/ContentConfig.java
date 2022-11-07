package com.karalash.ukrcontent.config;

import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.repos.ContentRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContentConfig {

    @Bean
    CommandLineRunner commandLineRunner(ContentRepo contentRepo) {
        return args -> {
            Content content = new Content();
        };
    }
}

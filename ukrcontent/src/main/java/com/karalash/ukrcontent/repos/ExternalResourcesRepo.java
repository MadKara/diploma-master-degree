package com.karalash.ukrcontent.repos;

import com.karalash.ukrcontent.model.entities.ExternalResources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ExternalResourcesRepo extends JpaRepository<ExternalResources, Integer> {
    @Transactional
    void deleteById(long id);

    @Transactional
    void deleteByContentId(long tutorialId);
}

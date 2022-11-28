package com.karalash.ukrcontent.service.impl;

import com.google.common.base.Optional;
import com.karalash.ukrcontent.dto.ExternalResourcesDto;
import com.karalash.ukrcontent.mapper.ExternalResourcesMapper;
import com.karalash.ukrcontent.model.entities.ExternalResources;
import com.karalash.ukrcontent.repos.ExternalResourcesRepo;
import com.karalash.ukrcontent.service.ExternalResourcesService;
import com.optimaize.langdetect.LanguageDetector;
import com.optimaize.langdetect.LanguageDetectorBuilder;
import com.optimaize.langdetect.i18n.LdLocale;
import com.optimaize.langdetect.ngram.NgramExtractors;
import com.optimaize.langdetect.profiles.LanguageProfile;
import com.optimaize.langdetect.profiles.LanguageProfileReader;
import com.optimaize.langdetect.text.CommonTextObjectFactories;
import com.optimaize.langdetect.text.TextObject;
import com.optimaize.langdetect.text.TextObjectFactory;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExternalResourcesImpl implements ExternalResourcesService {

    private final ExternalResourcesRepo externalResourcesRepo;
    private final ExternalResourcesMapper externalResourcesMapper;

    @Override
    public ExternalResourcesDto getById(int id) {
        ExternalResources extResEntity = externalResourcesRepo.findById(id);

        return externalResourcesMapper.toDto(extResEntity);
    }

    @Override
    public ExternalResourcesDto updateExtResources(ExternalResourcesDto resources) throws IOException {
        ExternalResources extResEntity = externalResourcesRepo.findById(resources.getId());

        Map<String, String> links = new HashMap<>();
        links.put("inst", resources.getInstagram());
        links.put("twit", resources.getTwitter());
        links.put("tt", resources.getTiktok());
        links.put("telegram", resources.getTelegram());
        links.put("youtube", resources.getYoutube());
        links.put("browseLink", resources.getBrowseLink());

        links.entrySet().forEach(link -> {
            if(link.getValue() != null) {
                Document doc = null;
                try {
                    doc = Jsoup.connect(link.getValue()).get();
                } catch (IOException e) {
                    throw new IllegalArgumentException("Smth wrong with link " + link.getKey());
                }
                String text = doc.body().text();

                //load all languages:
                List<LanguageProfile> languageProfiles = null;
                try {
                    languageProfiles = new LanguageProfileReader().readAllBuiltIn();
                } catch (IOException e) {
                    throw new IllegalArgumentException("Smth wrong with lang ");
                }

                //build language detector:
                LanguageDetector languageDetector = LanguageDetectorBuilder.create(NgramExtractors.standard())
                        .withProfiles(languageProfiles)
                        .build();
                //create a text object factory
                TextObjectFactory textObjectFactory = CommonTextObjectFactories.forDetectingOnLargeText();
                //query:
                TextObject textObject = textObjectFactory.forText(text);
                Optional<LdLocale> lang = languageDetector.detect(textObject);
                if(lang.isPresent()) {
                    if(!lang.get().getLanguage().equals("uk")) {
                        throw new IllegalArgumentException("Not soloviina --> " + link.getKey());
                    }
                } else {
                    throw new IllegalArgumentException("Lang is not found");
                }
            }
        });

        extResEntity.setBrowseLink(resources.getBrowseLink());
        extResEntity.setInstagram(resources.getInstagram());
        extResEntity.setTwitter(resources.getTwitter());
        extResEntity.setTiktok(resources.getTiktok());
        extResEntity.setTelegram(resources.getTelegram());
        extResEntity.setYoutube(resources.getYoutube());
        externalResourcesRepo.save(extResEntity);

        return externalResourcesMapper.toDto(extResEntity);
    }
}

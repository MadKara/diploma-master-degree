package com.karalash.ukrcontent.service.impl;

import com.google.common.base.Optional;
import com.karalash.ukrcontent.service.WordService;
import com.optimaize.langdetect.LanguageDetector;
import com.optimaize.langdetect.LanguageDetectorBuilder;
import com.optimaize.langdetect.i18n.LdLocale;
import com.optimaize.langdetect.ngram.NgramExtractors;
import com.optimaize.langdetect.profiles.LanguageProfile;
import com.optimaize.langdetect.profiles.LanguageProfileReader;
import com.optimaize.langdetect.text.CommonTextObjectFactories;
import com.optimaize.langdetect.text.TextObject;
import com.optimaize.langdetect.text.TextObjectFactory;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordServiceImpl implements WordService {
    @Data
    private static class Word implements Comparable<Word> {
        String word;
        int count;

        //        @Override
//        public int hashCode() {
//            return word.hashCode();
//        }
//
//        @Override
//        public boolean equals(Object obj) {
//            return word.equals(((Word) obj).word);
//        }
//
        @Override
        public int compareTo(Word b) {
            return b.count - count;
        }
    }

    @Override
    public List<String> getMostRepeatedWords(String htmlPage) throws IOException {
        long time = System.currentTimeMillis();

        Map<String, Word> countMap = new HashMap<String, Word>();
        Document doc = Jsoup.connect(htmlPage).get();
        String text = doc.body().text();

        //load all languages:
        List<LanguageProfile> languageProfiles = new LanguageProfileReader().readAllBuiltIn();
        //build language detector:
        LanguageDetector languageDetector = LanguageDetectorBuilder.create(NgramExtractors.standard())
                .withProfiles(languageProfiles)
                .build();
        //create a text object factory
        TextObjectFactory textObjectFactory = CommonTextObjectFactories.forDetectingOnLargeText();
        //query:
        TextObject textObject = textObjectFactory.forText(text);
        Optional<LdLocale> lang = languageDetector.detect(textObject);
        if (lang.isPresent()) {
            if (!lang.get().getLanguage().equals("uk")) {
                throw new IllegalArgumentException("Not soloviina");
            }
        } else {
            throw new IllegalArgumentException("Lang is not found");
        }

        String[] words = text.split(" ");
        for (String word : words) {
            if (word.length() < 4) {
                continue;
            }
            Word wordObj = countMap.get(word);
            if (wordObj == null) {
                wordObj = new Word();
                wordObj.word = word;
                wordObj.count = 0;
                countMap.put(word, wordObj);
            }
            wordObj.count++;
        }

        List<Word> sortedWords = countMap.values().stream().sorted().limit(20).collect(Collectors.toList());

        for (Word word : sortedWords) {
            System.out.println(word.count + "\t" + word.word);
        }

        time = System.currentTimeMillis() - time;

        System.out.println("Finished in " + time + " ms");

        return sortedWords.stream().map(word -> word.word).collect(Collectors.toList());
    }
}

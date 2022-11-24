package com.karalash.ukrcontent.service;

import java.io.IOException;
import java.util.List;

public interface WordService {
    List<String> getMostRepeatedWords(String htmlPage) throws IOException;
}

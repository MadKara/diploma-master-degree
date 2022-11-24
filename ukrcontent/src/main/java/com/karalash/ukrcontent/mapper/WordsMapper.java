package com.karalash.ukrcontent.mapper;

import com.karalash.ukrcontent.dto.WordsDto;
import com.karalash.ukrcontent.model.entities.Word;
import org.springframework.stereotype.Component;

@Component
public class WordsMapper implements Mapper<WordsDto, Word>{
    @Override
    public WordsDto toDto(Word input) {
        return WordsDto.builder()
                .id(input.getId())
                .word(input.getWord())
                .build();
    }

    @Override
    public Word toEntity(WordsDto input) {
        Word entity = new Word();
        entity.setId(input.getId());
        entity.setWord(input.getWord());
        return entity;
    }
}

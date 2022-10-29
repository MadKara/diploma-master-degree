package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.ContentDto;
import com.karalash.ukrcontent.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/contents/")
public class ContentController {

    private final ContentService contentService;

    @GetMapping
    public List<ContentDto> getContents() {
        return contentService.getAll();
    }
}

package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.ExternalResourcesDto;
import com.karalash.ukrcontent.service.ExternalResourcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/contents/ext-resources/")
@CrossOrigin(origins = "http://localhost:3000")
public class ExtResourcesController {

    private final ExternalResourcesService externalResourcesService;

    @GetMapping("{id}")
    public ExternalResourcesDto getExtResources(@PathVariable int id) {
        return externalResourcesService.getById(id);
    }

    @PutMapping
    public ExternalResourcesDto updateContentExtResources(@RequestParam(required = false) String instagram, @RequestParam(required = false) String twitter,
                                                          @RequestParam(required = false) String telegram, @RequestParam(required = false) String youtube,
                                                          @RequestParam(required = false) String tiktok,
                                                          @RequestParam int id, @RequestParam(required = false) String mainLink) throws IOException {
        return externalResourcesService.updateExtResources(new ExternalResourcesDto(id, twitter, instagram, tiktok, telegram, youtube, mainLink));
    }
}

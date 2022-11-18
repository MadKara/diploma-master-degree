package com.karalash.ukrcontent.controller;

import com.karalash.ukrcontent.dto.*;
import com.karalash.ukrcontent.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("service-api/contents/gallery/")
@CrossOrigin(origins = "http://localhost:3000")
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping("{id}")
    public List<GalleryDto> getByContentId(@PathVariable int id) {
        return galleryService.getByContentId(id);
    }

    @PostMapping
    public List<GalleryDto> uploadImages(@RequestParam("files") MultipartFile[] images, @RequestParam int contentId) {
        return galleryService.uploadImages(new GalleryDto(0, null, null, new ContentDto()), images, contentId);
    }
}

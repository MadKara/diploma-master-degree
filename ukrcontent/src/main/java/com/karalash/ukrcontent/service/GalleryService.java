package com.karalash.ukrcontent.service;

import com.karalash.ukrcontent.dto.GalleryDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {
    List<GalleryDto> uploadImages(GalleryDto gallery, MultipartFile[] file, int contentId);

    List<GalleryDto> getByContentId(int contentId);
}

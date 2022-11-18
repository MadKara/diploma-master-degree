package com.karalash.ukrcontent.service.impl;

import com.karalash.ukrcontent.cloudinaryapi.CloudinaryManager;
import com.karalash.ukrcontent.dto.GalleryDto;
import com.karalash.ukrcontent.mapper.ContentMapper;
import com.karalash.ukrcontent.mapper.GalleryMapper;
import com.karalash.ukrcontent.model.entities.Content;
import com.karalash.ukrcontent.model.entities.Gallery;
import com.karalash.ukrcontent.repos.ContentRepo;
import com.karalash.ukrcontent.repos.GalleryRepo;
import com.karalash.ukrcontent.service.GalleryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GalleryServiceImpl implements GalleryService {

    private final GalleryMapper galleryMapper;
    private final ContentMapper contentMapper;
    private final GalleryRepo galleryRepo;
    private final ContentRepo contentRepo;

    private final CloudinaryManager cloudinaryManager;

    @Override
    public List<GalleryDto> uploadImages(GalleryDto gallery, MultipartFile[] files, int contentId) {
        Optional<Content> contentById = contentRepo.findById(contentId);
        if (contentById.isEmpty()) {
            throw new IllegalArgumentException("Not found content with id: " + contentById);
        }
        Content contentEntity = contentById.get();
        List<GalleryDto> galleryDtos = new ArrayList<>();

        Arrays.stream(files).forEach(file -> {
            Gallery galleryEntity = galleryMapper.toEntity(new GalleryDto(0, "", null,
                    contentMapper.toDto(contentEntity)));
            galleryEntity.setDateTime(new Timestamp(System.currentTimeMillis()));
            galleryRepo.save(galleryEntity);
            galleryDtos.add(getGalleryDto(file, galleryEntity));
        });

        return galleryDtos;
    }

    @Override
    public List<GalleryDto> getByContentId(int contentId) {
        List<Gallery> gallery = galleryRepo.findByContentId(contentId);

        return galleryMapper.toDtos(gallery);
    }

    private GalleryDto getGalleryDto(MultipartFile image, Gallery galleryEntity) {
        String url = "";
        if (image != null) {
            try {
                url = cloudinaryManager.uploadImage(image, "users-image", galleryEntity.getId());
            } catch (IOException e) {
                log.error("Error save image to cloudinary: {}", e.getMessage());
            }
            galleryEntity.setImgPath(url);
        }
        galleryRepo.save(galleryEntity);
        return galleryMapper.toDto(galleryEntity);
    }
}

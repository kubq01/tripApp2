package com.example.demo.files;

import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final TripRepository tripRepository;

    @Transactional
    public void store(MultipartFile file, String category, Long tripId) throws IOException {
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileEntity fileToSave = FileEntity.builder()
                .name(fileName)
                .type(file.getContentType())
                .category(category)
                .data(file.getBytes())
                .build();
        trip.addFile(fileToSave);

        fileRepository.save(fileToSave);
        tripRepository.save(trip);

    }

    @Transactional
    public void deleteFile(Long id, Long tripId) {
        FileEntity file = fileRepository.findById(id).orElseThrow();
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();

        trip.deleteFile(file);
        tripRepository.save(trip);
        fileRepository.delete(file);
    }

    @Transactional
    public FileEntity getFile(Long id) {
        return fileRepository.findById(id).orElseThrow();
    }

    @Transactional
    public ResponseFiles getAllFiles(Long tripId) {
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();
        List<FileEntity> files = trip.getFiles();

        return new ResponseFiles(files.stream()
                .map(fileEntity -> {
                    String fileDownloadUri = ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("/files/")
                            .path(fileEntity.getId().toString())
                            .toUriString();

                    return new FileResponse(
                            fileEntity.getId(),
                            fileEntity.getName(),
                            fileDownloadUri,
                            fileEntity.getCategory());
                }).collect(Collectors.groupingBy(FileResponse::getCategory))
        );
    }

    @Transactional
    public Set<String> getCategories(Long tripId){
        Set<String> categories = new HashSet<>();
        TripEntity trip = tripRepository.findById(tripId).orElseThrow();


        trip.getFiles()
                .forEach(fileEntity -> categories.add(fileEntity.getCategory()));

        return categories;
    }
}

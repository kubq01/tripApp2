package com.example.demo.files;

import com.example.demo.files.*;
import com.example.demo.trip.TripEntity;
import com.example.demo.trip.TripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class FileServiceTest {

    @Mock
    private FileRepository fileRepository;

    @Mock
    private TripRepository tripRepository;

    @InjectMocks
    private FileService fileService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testStore() throws IOException {
        // Arrange
        Long tripId = 1L;
        TripEntity trip = new TripEntity();
        trip.setId(tripId);
        trip.setFiles(new ArrayList<>());
        when(tripRepository.findById(tripId)).thenReturn(Optional.of(trip));

        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Hello, World!".getBytes());
        String category = "TestCategory";

        // Act
        fileService.store(file, category, tripId);

        // Assert
        verify(fileRepository, times(1)).save(any(FileEntity.class));
        verify(tripRepository, times(1)).save(trip);
    }

    @Test
    void testDeleteFile() {
        // Arrange
        Long fileId = 1L;
        Long tripId = 1L;
        FileEntity file = new FileEntity();
        file.setId(fileId);
        TripEntity trip = new TripEntity();
        trip.setId(tripId);
        trip.setFiles(new ArrayList<>());
        trip.addFile(file);
        when(fileRepository.findById(fileId)).thenReturn(Optional.of(file));
        when(tripRepository.findById(tripId)).thenReturn(Optional.of(trip));

        // Act
        fileService.deleteFile(fileId, tripId);

        // Assert
        verify(fileRepository, times(1)).delete(file);
        verify(tripRepository, times(1)).save(trip);
    }

    @Test
    void testGetFile() {
        // Arrange
        Long fileId = 1L;
        FileEntity expectedFile = new FileEntity();
        when(fileRepository.findById(fileId)).thenReturn(Optional.of(expectedFile));

        // Act
        FileEntity result = fileService.getFile(fileId);

        // Assert
        assertEquals(expectedFile, result);
    }

    @Test
    void testGetCategories() {
        // Arrange
        Long tripId = 1L;
        TripEntity trip = new TripEntity();
        FileEntity file1 = new FileEntity();
        file1.setCategory("Category1");
        FileEntity file2 = new FileEntity();
        file2.setCategory("Category2");
        trip.setFiles(Arrays.asList(file1, file2));
        when(tripRepository.findById(tripId)).thenReturn(Optional.of(trip));

        // Act
        Set<String> categories = fileService.getCategories(tripId);

        // Assert
        assertEquals(2, categories.size());
        assertTrue(categories.contains("Category1"));
        assertTrue(categories.contains("Category2"));
    }
}
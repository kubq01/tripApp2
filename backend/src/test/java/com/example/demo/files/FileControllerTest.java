package com.example.demo.files;

import com.example.demo.files.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class FileControllerTest {

    @Mock
    private FileService fileService;

    @InjectMocks
    private FileController fileController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUploadFileSuccess() {
        // Arrange
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Hello, World!".getBytes());
        String category = "TestCategory";
        Long tripId = 1L;

        // Act
        ResponseEntity<String> responseEntity = fileController.uploadFile(file, category, tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Uploaded the file successfully: test.txt", responseEntity.getBody());
    }

    @Test
    void testUploadFileFailure() throws IOException {
        // Arrange
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Hello, World!".getBytes());
        String category = "TestCategory";
        Long tripId = 1L;

        doThrow(new RuntimeException("File upload failed")).when(fileService).store(file, category, tripId);

        // Act
        ResponseEntity<String> responseEntity = fileController.uploadFile(file, category, tripId);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Could not upload the file: test.txt!", responseEntity.getBody());
    }

    @Test
    void testDeleteFile() {
        // Arrange
        Long fileId = 1L;
        Long tripId = 1L;

        // Act
        ResponseEntity<String> responseEntity = fileController.deleteFile(fileId, tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("File deleted", responseEntity.getBody());
        verify(fileService, times(1)).deleteFile(fileId, tripId);
    }

    @Test
    void testGetListFiles() {
        // Arrange
        Long tripId = 1L;
        ResponseFiles responseFiles = new ResponseFiles(new HashMap<>());

        when(fileService.getAllFiles(tripId)).thenReturn(responseFiles);

        // Act
        ResponseEntity<ResponseFiles> responseEntity = fileController.getListFiles(tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(responseFiles, responseEntity.getBody());
    }

    @Test
    void testGetFile() {
        // Arrange
        Long fileId = 1L;
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName("test.txt");
        fileEntity.setData("Hello, World!".getBytes());

        when(fileService.getFile(fileId)).thenReturn(fileEntity);

        // Act
        ResponseEntity<byte[]> responseEntity = fileController.getFile(fileId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("attachment; filename=\"test.txt\"", responseEntity.getHeaders().get(HttpHeaders.CONTENT_DISPOSITION).get(0));
        assertEquals("Hello, World!", new String(responseEntity.getBody()));
    }

    @Test
    void testGetCategories() {
        // Arrange
        Long tripId = 1L;
        Set<String> categories = new HashSet<>();
        categories.add("Category1");
        categories.add("Category2");

        when(fileService.getCategories(tripId)).thenReturn(categories);

        // Act
        ResponseEntity<Set<String>> responseEntity = fileController.getCategories(tripId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(categories, responseEntity.getBody());
    }
}
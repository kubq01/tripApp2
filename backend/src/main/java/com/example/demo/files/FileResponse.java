package com.example.demo.files;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FileResponse {
    private Long id;
    private String name;
    private String url;
    private String category;
}

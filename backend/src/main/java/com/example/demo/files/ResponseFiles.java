package com.example.demo.files;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ResponseFiles {
    private Map<String, List<FileResponse>> categoryFileMap;
}

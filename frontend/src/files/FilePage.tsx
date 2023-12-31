import { useState, useEffect } from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import { useNavigate } from "react-router-dom";
import {Plan} from "../plan/Plan";
import {introBodyStyle} from "../config/style.tsx";

export function FilePage() {
    const [file, setFile] = useState();
    const [fileList, setFileList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const navigate = useNavigate();
    const isOrganizator = localStorage.getItem('organizator') == 'Me';

    useEffect(() => {
        fetchListFiles();
        fetchCategories();
    }, []);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append("file", file);
        let category = selectedCategory || newCategory;

        if(category == "")
            category = "others"

        const token = localStorage.getItem('token');
        const tripId = localStorage.getItem('currentTripId');

        if (token) {
            fetch(`http://localhost:8081/file/upload?category=${category}&tripId=${tripId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
                credentials: 'include',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('File uploaded successfully:', data);
                    fetchListFiles();
                    fetchCategories();
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    fetchListFiles();
                    fetchCategories();
                });
        }
    };

    const fetchListFiles = () => {
        const token = localStorage.getItem('token');
        const tripId = localStorage.getItem('currentTripId');
        fetch('http://localhost:8081/file?tripId=' + tripId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('List of files:', data);
                setFileList(data.categoryFileMap);
            })
            .catch(error => {
                console.error('Error fetching list of files:', error);
            });
    };

    const fetchCategories = () => {
        const token = localStorage.getItem('token');
        const tripId = localStorage.getItem('currentTripId');
        fetch('http://localhost:8081/file/categories?tripId=' + tripId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Categories:', data);
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    const removeFile = async (fileId: number) => {
        try {
            const tripId = localStorage.getItem('currentTripId');
            const response = await fetch('http://localhost:8081/file/delete?fileId=' + fileId + '&tripId=' + tripId, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });

            if (response.ok) {
                console.error('Success deleting file');
                fetchListFiles()
                fetchCategories()
            } else {
                console.error('Error deleting file invites');
                fetchListFiles()
                fetchCategories()

            }
        } catch (error) {
            console.error('Error deleting file:', error);
            fetchListFiles()
            fetchCategories()
        }
    }

    const downloadFile = async (fileId: number, fileName: String) => {
        try {
            const response = await fetch(`http://localhost:8081/file/${fileId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // Create a download link
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${fileName}`);
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Remove the link from the DOM
                document.body.removeChild(link);

                console.info('Success downloading file');
            } else {
                console.error('Error downloading file');
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    return (
        <Box style={introBodyStyle}>
            <NavBarTrip />
            <main className="App">
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    sx={{ backgroundColor: 'rgba(44, 51, 51, 0.8)', fontSize: 20, height: "100%", px: 3, py: 2 }}
                >
                    <Card sx={{ maxWidth: '400px', margin: 'auto', backgroundColor: "#2C3333", fontSize: 16 }}>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <input
                                    type="file"
                                    onChange={onFileChange}
                                    style={{ marginBottom: '8px', fontSize: '12px' }}
                                />
                                <select
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    style={{ marginBottom: '8px', fontSize: '12px' }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="New Category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    style={{ marginBottom: '8px', fontSize: '12px' }}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ fontSize: '12px', padding: '4px 8px' }}
                                    onClick={onFileUpload}
                                >
                                    Upload
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            backgroundColor: "#2C3333",
                            fontSize: 20,
                            height: "70%",
                            overflowY: "scroll",
                            px: 3,
                            py: 2,
                            textAlign: "left",
                        }}
                    >
                        {Object.keys(fileList).map(category => (
                            <div key={category}>
                                <Typography variant="h5" style={{ marginBottom: '8px', color: 'white' }}>
                                    {category}
                                </Typography>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {fileList[category].map(file => (
                                        <li
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px',
                                                alignItems: 'center',
                                            }}
                                            key={file.name}
                                        >
                                            <Typography variant="body1" style={{ color: 'white' }}>
                                                {file.name}
                                            </Typography>
                                            <Box>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    style={{ marginLeft: '15px' }}
                                                    onClick={() => downloadFile(file.id, file.name)}
                                                >
                                                    Download
                                                </Button>
                                                {isOrganizator && (
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        style={{ marginLeft: '15px' }}
                                                        onClick={() => removeFile(file.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </Box>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Box>
                </Box>
            </main>
        </Box>
    );

}

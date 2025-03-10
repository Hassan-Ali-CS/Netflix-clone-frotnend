import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Box, Typography, Button, Modal, TextField, Snackbar, Alert, Table, 
  TableHead, TableRow, TableCell, TableBody, Paper
} from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";
import * as AWS from "aws-sdk";
import { uploadFileToS3 } from "../services/s3Service";

// Define Movie Type
interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  duration: number;
  imageUrl?: string;
  videoUrl?: string; 
}

const ManageMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null); 
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null); 

  const [newMovie, setNewMovie] = useState<Omit<Movie, "id">>({
    title: "",
    description: "",
    releaseDate: "",
    rating: 0,
    duration: 0,
    imageUrl: "",
    videoUrl: "", 
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // AWS S3 Configuration
  const awsS3Bucket: string = process.env.REACT_APP_AWS_BUCKET_NAME || "";
  const awsAccessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID!;
  const awsSecretKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!;
  


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get<Movie[]>("http://localhost:4000/movie");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (type === "image" && file.size > 5 * 1024 * 1024) { // 5MB
        setSnackbarMessage("Image file size exceeds 5MB");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      } else if (type === "video" && file.size > 100 * 1024 * 1024) { // 100MB
        setSnackbarMessage("Video file size exceeds 100MB");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (type === "image") {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        setSelectedVideo(file);
        setVideoPreview(URL.createObjectURL(file));
      }
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const { Location } = await uploadFileToS3(file)
      console.log(Location,'=====')
      return Location;
    } catch (error) {
      console.error("S3 Upload Error:", error);
      throw new Error("Failed to upload file to S3.");
    }
  };

  const submitData = async () => {
    if (!selectedFile || !selectedVideo) { 
      setSnackbarMessage("Please select an image and a video.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const imageUrl = await uploadFile(selectedFile);
      const videoUrl = await uploadFile(selectedVideo); 

      const payload = {
        imageUrl,
        videoUrl, 
        title: newMovie.title,
        description: newMovie.description,
        releaseDate: newMovie.releaseDate,
        rating: parseFloat(newMovie.rating.toString()), 
        duration: parseInt(newMovie.duration.toString(), 10),
      };

      await axios.post("http://localhost:4000/movie", payload);

      setSnackbarMessage("Movie added successfully!");
      setSnackbarSeverity("success");
      fetchMovies();
      setOpenModal(false);
      resetMovieForm();
    } catch (err) {
      console.error("Error adding movie:", err);
      setSnackbarMessage("Failed to add movie. Try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const resetMovieForm = () => {
    setNewMovie({
      title: "",
      description: "",
      releaseDate: "",
      rating: 0,
      duration: 0,
      imageUrl: "",
      videoUrl: "", 
    });
    setSelectedFile(null);
    setSelectedVideo(null); 
    setImagePreview(null);
    setVideoPreview(null); 
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/movie/${id}`);
      setSnackbarMessage("Movie deleted successfully");
      setSnackbarSeverity("success");
      fetchMovies();
    } catch (err) {
      setSnackbarMessage("Failed to Delete movie. Try Again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };


  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Box sx={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}>
      <AdminNavbar />
      <Box sx={{ padding: "2rem" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Manage Movies</Typography>
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add Movie
          </Button>
        </Box>

        <Paper sx={{ marginTop: "2rem", padding: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Poster</TableCell>
                <TableCell>Video</TableCell> {/*  Added video column */}
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>
                    {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} style={{ width: "100px" }} />}
                  </TableCell>
                  <TableCell>
                    {movie.videoUrl && (
                      <video width="120" height="80" 
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                             }}
                            controls>
                        <source src={movie.videoUrl} type="video/mp4" />
                      </video>
                    )}
                  </TableCell>
                  <TableCell>{movie.rating}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDelete(movie.id)}>
                      Delete
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Add Movie Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box 
          sx={{ 
            padding: "2rem", 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: "90vw",
            maxWidth: 500,
            maxHeight: "90vh",
            overflowY: "auto", 
            bgcolor: "background.paper", 
            borderRadius: 2, 
            boxShadow: 24, 
            p: 4,
            display: "flex",
            flexDirection: "column", 
          }}
        >
          <Typography variant="h6" mb={2}>Add Movie</Typography>
          <TextField label="Title" fullWidth margin="normal" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
          <TextField label="Description" fullWidth margin="normal" value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
          <TextField label="Release Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={newMovie.releaseDate} onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })} />
          <TextField label="Rating" type="number" fullWidth margin="normal" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: parseFloat(e.target.value) })} />
          <TextField label="Duration (minutes)" type="number" fullWidth margin="normal" value={newMovie.duration} onChange={(e) => setNewMovie({ ...newMovie, duration: parseInt(e.target.value, 10) })} />
          
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} />
          {imagePreview && (
            <Box sx = {{display: "flex", justifyContent: "center", mt: 1 }}>
              <img src={imagePreview} alt="Preview" style={{ width: "150px", borderRadius: "8px" }}/>
            </Box>
          )}

          <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} />
          {videoPreview && (
            <Box sx= {{ display: "flex", justifyContent: "center", mt: 1 }}>
              <video width="150" controls style={{maxHeight: "150px", borderRadius: "8px"}}>
                <source src={videoPreview} type="video/mp4" />
              </video>
            </Box>
          )}
          
          <Button variant="contained" color="primary" fullWidth sx={{ mt:2 }} onClick={submitData}>
            Add Movie
          </Button>
        
        </Box>
      </Modal>

       {/* Snackbar for notifications */}
       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageMovies;

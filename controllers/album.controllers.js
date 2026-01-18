const { get } = require("mongoose");
const Album = require("../models/album");

// CREATE ALBUM
const createAlbum = async (req, res) => {
  try {
    const { title, description } = req.body;

// VALIDATION

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }   
    if (title.length > 100) {
      return res.status(400).json({ message: "Title cannot exceed 100 characters" });
    }       
    if (description && description.length > 500) {
      return res.status(400).json({ message: "Description cannot exceed 500 characters" });
    }

    const newAlbum = new Album({
      title,
      description,
    });


// SAVED ALBUM 
    const savedAlbum = await newAlbum.save();

    res.status(201).json({
      message: "Album created successfully",
      data: savedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create album",
      error: error.message,
    });
  }
};


//READ ALBUM
const readAlbum = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json({
            message: "Albums retrieved successfully",
            data: albums
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve albums",
            error: error.message
        });
    }
};

//READ ALBUM BY ID
const readAlbumByID = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({
                message: "Sorry but album not found"
            });
        }
        return res.status(200).json({
            message: "Congrats album retrieved successfully",
            data: album
            });
        } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve album",
            error: error.message
        });
    }
}; 

//UPDATE ALBUM 
const updateAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const { title, description } = req.body;        
        const updatedAlbum = await Album.findByIdAndUpdate(
            albumId,
            { title, description },
            { new: true }
        );
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required"
            });
        }
        if (title.length > 100) {
            return res.status(400).json({
                message: "Title cannot exceed 100 characters"
            });
        }
        if (description && description.length > 500) {
            return res.status(400).json({
                message: "Description cannot exceed 500 characters"
            });
        }   
        if (!updatedAlbum) {
            return res.status(404).json({
                message: "Album not found"
            });
        }
        res.status(200).json({
            message: "Album updated successfully",
            data: updatedAlbum
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update album",
            error: error.message
        });
    }
};

//DELETE ALBUM 
const deleteAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const deletedAlbum = await Album.findByIdAndDelete(albumId);
        if (!deletedAlbum) {
            return res.status(404).json({
                message: "Album not found"
            });
        }
        res.status(200).json({
            message: "Album deleted successfully",
            data: deletedAlbum
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete album",
            error: error.message
        });
    } 
};

//ADD PHOTO
const addPhoto = async (req, res) => {
    try {
        const albumId = req.params.id;
        const { imageurl, caption } = req.body;
        const album = await Album.findById(albumId);

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }
        if (imageurl.trim()  === "" || !imageurl) {
            return res.status(400).json({
                message: "Image URL is required"
            });
        }

        album.photos.push({ imageurl, caption });
        await album.save();

        res.status(201).json({
            message: "Photo added successfully",
            data: album
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add photo",
            error: error.message
        });
    }
};

//GET PHOTO
const getPhoto = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }
        res.status(200).json({
            message: "Photos retrieved successfully",
            data: album.photos
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve photos",
            error: error.message
        });
    }
};

//DELETE PHOTO
const deletePhoto = async (req, res) => {
    try {
        const albumId = req.params.id;
        const photoId = req.params.photoId;
        const album = await Album.findById(albumId);   
        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }    
        const photoIndex = album.photos.findIndex(photo => photo._id.toString() === photoId);
        if (photoIndex === -1) {
            return res.status(404).json({
                message: "Photo not found"
            });
        }    
        album.photos.splice(photoIndex, 1);
        await album.save();

        res.status(200).json({
            message: "Photo deleted successfully",
            data: album
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete photo",
            error: error.message
        });
    }
} 

//DELETE ALL PHOTO
const deleteAllPhotos = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }
        album.photos = [];
        await album.save();

        res.status(200).json({
            message: "All photos deleted successfully",
            data: album
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete all photos",
            error: error.message
        });
    }
};



module.exports = {
  createAlbum,
  readAlbum,
  readAlbumByID,
  updateAlbum,
  deleteAlbum,
  addPhoto,
  getPhoto,
  deletePhoto,
  deleteAllPhotos,
};

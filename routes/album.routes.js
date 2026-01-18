console.log("album.routes success loaded");
const express = require("express");
const router = express.Router();
const   {
    createAlbum, 
    readAlbum, 
    readAlbumByID, 
    updateAlbum, 
    deleteAlbum, 
    addPhoto,
    getPhoto,
    deletePhoto,  
    deleteAllPhotos,
        } = require("../controllers/album.controllers");


//ROUTERS
router.post("/albums", createAlbum);
router.get("/albums", readAlbum);
router.get("/albums/:id", readAlbumByID);
router.put("/albums/:id", updateAlbum);
router.delete("/albums/:id", deleteAlbum);
router.post("/albums/:id/photos", addPhoto);
router.get("/albums/:id/photos", getPhoto);
router.delete("/albums/:id/photos/:photoId", deletePhoto);
router.delete("/albums/:id/photos", deleteAllPhotos);


module.exports = router;
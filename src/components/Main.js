import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Modal from "react-modal";

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { Fab } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PhotoIcon from '@mui/icons-material/Photo';

const TextAlignContainer = styled(Container)(({ theme }) => ({
    textAlign: "center",
}));

const TextAlignGrid = styled(Grid)(({ theme }) => ({
    textAlign: "center",
}));


const Main = () => {

    Modal.setAppElement("#root");
    const {
        title,
        setTitle,
        video,
        setVideo,
        thum,
        setThum,
        modalIsOpen,
        setModalIsOpen,
        newVideo,
    } = useContext(ApiContext);

    const customStyles = {
        content: {
          top: "30%",
          left: "43%",
          right: "auto",
          bottom: "auto",
        },
    };

    const handleEditMovie = () => {
        const fileInput = document.getElementById("mp4Input");
        fileInput.click();
        fileInput.addEventListener("change", (e) => {
          console.log("Selected video file:", e.target.files[0]);
        });
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
        fileInput.addEventListener("change", (e) => {
          console.log("Selected thumbnail file:", e.target.files[0]);
        });
    };

  return (
    <>
      <TextAlignGrid>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>

            <Grid item xs={1}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setModalIsOpen(true)}
              >
                <AddCircleIcon />
              </Fab>
            </Grid>

            <Grid item xs={8}>
              <VideoDetail />
            </Grid>

            <Grid item xs={3}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </TextAlignGrid>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <Typography>Movie title</Typography>
        <br />
        <TextField
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <br />
        <TextAlignContainer>
          <input
            type="file"
            id="mp4Input"
            hidden="hidden"
            onChange={(event) => setVideo(event.target.files[0])}
          />

          <IconButton onClick={handleEditMovie}>
            <VideoFileIcon className="photo" />
          </IconButton>

          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={(event) => setThum(event.target.files[0])}
          />

          <IconButton onClick={handleEditPicture}>
            <PhotoIcon className="photo" />
          </IconButton>
          <br />

          {title && video && thum && (
            <button className="btn-modal" onClick={() => newVideo()}>
              <UploadFileIcon />
            </button>
          )}
          <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
            <CancelPresentationIcon />
          </button>
        </TextAlignContainer>
      </Modal>
    </>
  );
};

export default Main

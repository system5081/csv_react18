import React, { useContext, useRef } from "react";
import { ApiContext } from "../context/ApiContext";

import ReactPlayer from "react-player";

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Fab } from '@mui/material';
import { Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

const TitleTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const DeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const VideoDetail = () => {

  const player = useRef(null);
  const {
    selectedVideo,
    deleteVideo,
    incrementLike,
    incrementDislike,
  } = useContext(ApiContext);

  if (!selectedVideo)
  return (
    <div className="container">
      <button className="wait">
        <IoLogoYoutube />
      </button>
    </div>
  );
  return (
<>
      <div className="wrapper">
        <ReactPlayer
          className="player"
          url={selectedVideo.video}
          ref={player}
          width="100%"
          height="100%"
          playing
          controls
          disablePictureInPicture
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </div>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <TitleTypography variant="h6">
            {selectedVideo.title}
          </TitleTypography>
        </Grid>

        <Grid item xs={1}>
          <button className="like" onClick={() => incrementLike()}>
            <AiFillLike />
            <Typography>{selectedVideo.like}</Typography>
          </button>
        </Grid>
        <Grid item xs={1}>
          <button className="like" onClick={() => incrementDislike()}>
            <AiFillDislike />
            <Typography>{selectedVideo.dislike}</Typography>
          </button>
        </Grid>
      </Grid>
      <DeleteFab
        
        color="primary"
        aria-label="delete"
        onClick={() => deleteVideo()}
      >
        <DeleteIcon />
      </DeleteFab>
    </>
  );
};

export default VideoDetail;

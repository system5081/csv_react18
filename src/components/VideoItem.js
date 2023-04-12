import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';

const CardCard = styled(Card)(({ theme }) => ({
    position: "relative",
    display: "flex",
    marginBottom: 15,
  }));

const CardcontCardcontent= styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const VideoItem = () => {

    const { setSelectedVideo } = useContext(ApiContext);

  return (
    <CardCard onClick={() => setSelectedVideo(video)}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="thumnail"
          height="200"
          image={video.thum}
        />
        <CardcontCardcontent>
          <Typography variant="h6"> {video.title} </Typography>
        </CardcontCardcontent>
      </CardActionArea>
    </CardCard>
  );
};

export default VideoItem;

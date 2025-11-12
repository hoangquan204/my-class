import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getThemeSelector, getVideoSelector } from "../../redux/selector";
import { getListVideo } from "./videoSlice";
import VideoCreationModal from "./VideoCreationModal";

const CourseVideos = ({classRoomId}) => {
  const video = useSelector(getVideoSelector)
  const theme = useSelector(getThemeSelector)
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getListVideo(classRoomId))
  }, [])

  useEffect(() => {
    if (Array.isArray(video?.list) && video.list.length > 0) {
      setSelectedVideo(video.list[0]);
    }
  }, [video])

  const [selectedVideo, setSelectedVideo] = useState({});

  return (
    <Box>
      <div className="py-2 text-center">
        <VideoCreationModal classRoomId={classRoomId}></VideoCreationModal>
      </div>
      {Array.isArray(video?.list) && video.list.length > 0 ? (
        <div className="p-6 bg-gray-50 min-h-screen">
        <Grid container spacing={4}>
          {/* Phần video đang phát */}
          <Grid item xs={12} md={8}>
            <div className="bg-black rounded-xl overflow-hidden shadow-md">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full aspect-video"
                allowFullScreen
              ></iframe>
            </div>
            <Typography variant="h6" className="mt-3 font-semibold">
              {selectedVideo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-1">
              {selectedVideo.description}
            </Typography>
          </Grid>

          {/* Danh sách video bên phải */}
          <Grid item xs={12} md={4}>
            <div className="flex flex-col gap-3">
              {Array.isArray(video?.list) && video?.list.map((video) => (
                <Card
                  key={video?.id}
                  className={`flex gap-3 items-center cursor-pointer hover:shadow-md transition ${
                    selectedVideo?.id === video?.id ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 160 }}
                    image={video.thumbnail}
                    alt={video.title}
                    className="rounded-l-md"
                  />
                  <CardContent className="p-2">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {video.title}
                    </Typography>
                    <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2, // hiển thị 2 dòng
  }}
>
  {video.description}
</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
       
      ):
      <Box
          className="flex flex-col items-center justify-center"
          sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
      >
          <Typography variant="h6" gutterBottom>
              Chưa có thông báo nào!
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Hãy theo dõi thường xuyên để nhận được thông báo mới nhé.
          </Typography>
       </Box>
      
      }
    </Box>
  );
};

export default CourseVideos;

import React from "react";
import { Box, Flex, Stack, Avatar, Text } from "@chakra-ui/core";
import VideoPlayer from "../data-display/VideoPlayer";
import Rating from "../data-display/Rating";

const mediaProps = {
  height: "100%",
  weight: "105%",
  maxHeight: "450px",
  minHeight: "450px",
  borderRadius: "16px 16px 0px 0px",
  display: "block",
  position: "relative",
  visibility: "initial",
  objectFit: "cover"
};

const videoWrapper = {
  height: "480px",
  direction: "column",
  borderWidth: "2xs",
  borderColor: "gray.100",
  boxShadow: "md",
  borderRadius: "16px",
  overflow: "hidden",
  bg: "gray.50"
};

const CelebrityVideo = ({
  name = "Femi Monirayo",
  video = "https://www.youtube.com/watch?v=KT9zihN24bE",
  picture = "https://uinames.com/api/photos/female/12.jpg"
}) => {
  return (
    <Flex {...videoWrapper}>
      <Box flex={1} overflow="hidden" borderRadius="16px 16px 0px 0px">
        <VideoPlayer {...mediaProps} url={video} />
      </Box>

      <Stack py={4} spacing={3} px={6} isInline align="center">
        <Avatar size="sm" src={picture} />
        <Box>
          <Text fontSize="md" isTruncated lineHeight="none">
            By {name}
          </Text>
          <Rating size="sm" value={4} />
        </Box>
      </Stack>
    </Flex>
  );
};

export default CelebrityVideo;

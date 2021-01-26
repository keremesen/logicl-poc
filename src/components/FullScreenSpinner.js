import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const FullScreenSpinner = () => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="998"
      backgroundColor="rgba(163, 163, 163, .5)"
    >
      <Spinner
        boxSize={32}
        position="absolute"
        top="24%"
        left="47%"
        zIndex="999"
        size="xl"
        color="red.500"
      />
    </Box>
  );
};

export default FullScreenSpinner;

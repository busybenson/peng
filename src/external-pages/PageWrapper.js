import React from "react";
import { Box } from "@chakra-ui/core";
import Navigation from "./NavigationBar";
import Footer from "./Footer";

const PageWrapper = ({
  children,
  navigationProps = {},
  footerProps = {},
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Navigation {...navigationProps} />
      {children}
      <Footer {...footerProps} />
    </Box>
  );
};

export default PageWrapper;

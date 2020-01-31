import {
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text
} from "@chakra-ui/core";
import React from "react";

const Footer = ({
  wrapperProps = { maxW: ["100%", "100%", "100%", "1152px"], mx: "auto" }
}) => {
  return (
    <Box borderTopWidth="2xs" py={8} bg="gray.800" color="white">
      <Box {...wrapperProps}>
        <Box px={[5, 6]}>
          <Flex direction={["column", "row"]} justify="space-between">
            <Stack flex={1}>
              <Text fontWeight="bold">Contact</Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon icon="check-circle" color="green.500" />
                  +234 808 200 5687
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="green.500" />
                  contact@sendpeng.com
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="green.500" />
                  support@sendpeng.com
                </ListItem>
              </List>
            </Stack>
            <Stack flex={1}>
              <Text fontWeight="bold">About</Text>
              <Text>Terms of use</Text>
              <Text>Privacy policy</Text>
              <Text>FAQ</Text>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

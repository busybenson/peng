import {
  Avatar,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  Flex,
  Text,
  Heading,
  Link,
  Stack,
  Grid
} from "@chakra-ui/core";
import React from "react";
import Navigation from "../external-pages/NavigationBar";
import { BookingSummary, NextSteps } from "./Booking";
import { useGetCeleb, root_url } from "../celebrity-ui/hooks";

const BookingConfirmation = ({
  wrapperProps = { maxW: ["100%", "100%", "100%", "100%", "80%"], mx: "auto" }
}) => {
  const { data } = useGetCeleb("omotolajolade");

  return (
    <Box>
      <Navigation />
      <BackgroundImage {...data} />
      <Box {...wrapperProps} px={[5, 8]}>
        <Grid
          templateColumns={["none", "none", "none", "3fr 2fr"]}
          mt={[8, 8, 8, 6]}
          mb={[12, 12, 12, 10]}
          columnGap={12}
        >
          <Box />
          <NextSteps {...data} />
        </Grid>
      </Box>
    </Box>
  );
};

export default BookingConfirmation;

const BackgroundImage = ({ picture, nickname, slug_url }) => {
  const link = root_url + slug_url;
  return (
    <Flex
      h="280px"
      align="center"
      direction="column"
      justifyContent="center"
      justify="center"
      position="relative"
    >
      <Image
        h="100%"
        w="100%"
        bgImage="url(https://i.ibb.co/SfxQmY9/1567770.gif)"
        bgSize="cover"
        bgPos="center"
        backgroundRepeat="no-repeat"
      />
      <Box mx="auto" w={["80%", "40%"]} position="absolute" textAlign="center">
        <Avatar
          src="https://uinames.com/api/photos/male/12.jpg"
          name="Esan Temitope"
          showBorder
          borderWidth="xs"
          borderColor="pink.300"
        />
        <Stack mt={5}>
          <Heading size="lg" fontWeight="bold" textTransform="uppercase">
            Your request is booked!
          </Heading>
          <Text fontSize="sm" opacity={0.8}>
            Your request was sent to{" "}
            <Link color="pink.500" href={link}>
              Omotola Jolade
            </Link>
            . You should receive an email shortly
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

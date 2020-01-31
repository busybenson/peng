import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  Text
} from "@chakra-ui/core";
import Pluralize from "pluralize";
import React, { useContext } from "react";
import { AppContext } from "../authentication/AppProvider";
import { useRouterDisclosure } from "../authentication/AppRouter";
import Rating from "../data-display/Rating";
import Testimonial from "../data-display/Testimonial";
import VideoPlayer from "../data-display/VideoPlayer";
import PageWrapper from "../external-pages/PageWrapper";
import CelebrityCard from "./CelebrityCard";
import CelebrityVideo from "./CelebrityVideo";
import { root_url, useGetCeleb } from "./hooks";
import { useParams } from "react-router";

const wrapperProps = { maxW: ["100%", "100%", "100%", "80%"], mx: "auto" };
const mediaProps = {
  height: "100%",
  weight: "100%",
  maxHeight: "450px",
  minHeight: "450px",
  borderRadius: "0px",
  display: "block",
  position: "relative",
  visibility: "initial",
  objectFit: "cover"
};

const CelebrityProfile = ({ toNextPage: _toNextPage, ...props }) => {
  const { data } = useGetCeleb("omotolajolade");
  const { slug_url } = useParams();
  function toNextPage() {
    _toNextPage(slug_url);
  }
  return (
    <PageWrapper>
      <ProfilePage {...{ slug_url, toNextPage }} {...data} {...wrapperProps} />
    </PageWrapper>
  );
};

export default CelebrityProfile;

const WishListHeader = ({ nickname, picture }) => {
  return (
    <Stack isInline align="center">
      <Avatar src={picture} name={nickname} />
      <Box>
        <Text fontWeight="medium" lineHeight="short">
          {nickname}
        </Text>
        <Text fontSize="sm" fontWeight="normal">
          Login to add to wishlist
        </Text>
      </Box>
    </Stack>
  );
};

const ProfilePage = ({
  nickname,
  picture: photo,
  video,
  profession,
  description,
  reviews = [...new Array(12)],
  related = [...new Array(4)],
  latest_bookings = [...new Array(6)],
  price,
  currency = "₦",
  rating = 4.5,
  slug_url,
  toNextPage
}) => {
  const { isOpen, onClose, onOpen } = useRouterDisclosure("/reviews");
  const { useAuthDisclosure } = useContext(AppContext);
  const { onOpen: onWishListOpen } = useAuthDisclosure();
  const picture = root_url + photo;

  return (
    <Box>
      <Box position="relative" bg="gray.50" py={[0, 8]}>
        <Flex px={[0, 6]} {...wrapperProps} direction={["column", "row"]}>
          <Box
            zIndex={1}
            w={["100%", "45%", "35%", "30%"]}
            mr={[0, 5, 8]}
            overflow="hidden"
            bg="white"
            rounded={["none", "lg"]}
            boxShadow={video ? "xl" : "none"}
            h={["360px", "450px"]}
          >
            {video ? (
              <VideoPlayer {...mediaProps} url={video} playing />
            ) : (
              <Image src={picture} {...mediaProps} />
            )}
          </Box>
          <Box px={[5, 0]} flex={1} zIndex={1}>
            <Box h={["auto", "260px"]} pt={[6, 0]}>
              <Heading>{nickname}</Heading>
              <Text fontSize="xl">{profession}</Text>

              <Text my={5} opacity={0.8}>
                {description}
              </Text>

              {price && (
                <ButtonGroup size="lg" mt={6} spacing={[3, 3, 6]}>
                  <Button
                    onClick={toNextPage}
                    fontSize="md"
                    variantColor="pink"
                    variant="solid"
                  >
                    Book now for {currency + price.toLocaleString()}
                  </Button>

                  <Button
                    display={["none", "none", "inline-block"]}
                    fontSize="md"
                    variantColor="pink"
                    onClick={() =>
                      onWishListOpen(
                        "login",
                        <WishListHeader {...{ nickname, picture }} />
                      )
                    }
                    leftIcon="heart"
                    variant="link"
                  >
                    Wishlist
                  </Button>

                  <IconButton
                    variant="outline"
                    variantColor="pink"
                    onClick={() =>
                      onWishListOpen(
                        "login",
                        <WishListHeader {...{ nickname, picture }} />
                      )
                    }
                    display={["inline-block", "inline-block", "none"]}
                    size="lg"
                    icon="heart"
                  />
                </ButtonGroup>
              )}

              {/* <Stack mt={6} isInline align="center">
                <Icon name="delete" />
                <Text>Typically responds in 2 hours</Text>
              </Stack> */}
            </Box>

            {reviews && reviews.length > 0 && (
              <Flex pt={12} direction={["column", "column", "row"]}>
                <Box spacing={1} flex={1} pt={[0, 6, 0]}>
                  <Text fontSize="lg" lineHeight="none" fontWeight="bold">
                    {Pluralize("review", reviews.length, true)}
                  </Text>
                  <Stack isInline align="center" spacing={4}>
                    <Rating size="lg" value={1} isReadOnly />
                    <Text fontSize="lg" mt={2}>
                      {rating} stars
                    </Text>
                  </Stack>
                  <Box mt={[5, 0]} d={["block", "none", "none", "none"]}>
                    {reviews.slice(0, 1).map((review, index) => (
                      <Testimonial {...review} as="i" key={index} mb={5} />
                    ))}
                  </Box>
                  {reviews.length > 1 && (
                    <Button
                      onClick={() => onOpen()}
                      variant="link"
                      variantColor="pink"
                    >
                      See all reviews
                    </Button>
                  )}
                </Box>
                <Box flex={2} mt={[6, 0]} d={["none", "none", "none", "block"]}>
                  {reviews.slice(0, 1).map((review, index) => (
                    <Testimonial {...review} as="i" key={index} mb={5} />
                  ))}
                </Box>
              </Flex>
            )}

            <Stack mt={5} isInline align="center">
              {reviews.slice(0, 3).map(x => (
                <Tag
                  // mt={[5, 0]}
                  size="lg"
                  bg="gray.100"
                  rounded="full"
                  _hover={{ bg: "gray.200" }}
                  cursor="pointer"
                >
                  <TagLabel>Actress</TagLabel>
                </Tag>
              ))}
            </Stack>
          </Box>
        </Flex>
        <Box
          position="absolute"
          bg="white"
          bottom={0}
          h={["272px", "172px", "192px", "200px"]}
          w="100%"
          zIndex="0"
        />
      </Box>
      {latest_bookings && latest_bookings.length > 0 && (
        <Box pt={[20, 12, 20]} px={[5, 6]} {...wrapperProps}>
          <Heading size="lg" mb={6}>
            Latest videos
          </Heading>
          <Grid
            templateColumns={["none", "repeat(auto-fill, minmax(232px, 1fr))"]}
            rowGap={8}
            columnGap={8}
            w="100%"
          >
            {latest_bookings.slice(0, 6).map(x => (
              <CelebrityVideo key={x} />
            ))}
          </Grid>
        </Box>
      )}

      {related && related.length > 0 && (
        <Box py={20} px={[5, 6]} {...wrapperProps}>
          <Heading size="lg" mb={6}>
            Similar celebs
          </Heading>

          <Grid
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(auto-fill, minmax(192px, 1fr))"
            ]}
            rowGap={6}
            columnGap={6}
          >
            {related.slice(0, 4).map((celeb, index) => (
              <CelebrityCard {...celeb} key={index} />
            ))}
          </Grid>
        </Box>
      )}
      <Modal
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent rounded="md">
          <ModalHeader borderBottomWidth="2xs">
            {Pluralize("Review", reviews.length, true)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {reviews.map(x => (
              <Testimonial key={x} py={5} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

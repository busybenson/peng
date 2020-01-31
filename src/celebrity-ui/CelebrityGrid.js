import { Box, Grid, Text } from "@chakra-ui/core";
import React from "react";
import CelebrityCard from "./CelebrityCard";
import LoadingCard from "./LoadingCelebrityCard";
import { useHistory } from "react-router";

const CategoryGrid = ({ data, isError, isLoading }) => {
  // const history = useHistory();
  let dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Box>
      {isError ? (
        <Text>Images failed to load</Text>
      ) : (
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(auto-fill, minmax(192px, 1fr))"
          ]}
          rowGap={6}
          columnGap={5}
          w="100%"
        >
          {!isLoading || data.length === 0
            ? dummyArray.map(num => <LoadingCard key={num} />)
            : data &&
              data.length > 0 &&
              data.map(celebrity => (
                <CelebrityCard
                  // onClick={() => history.push(`/${celebrity.slug_url}`)}
                  {...celebrity}
                  key={celebrity.slug_url}
                />
              ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryGrid;

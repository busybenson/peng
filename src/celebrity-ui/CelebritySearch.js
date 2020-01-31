// @refresh reset
import { Box, Flex, Text } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Route } from "react-router-dom";
import Select from "../form-elements/Select";
import { useGetCategories } from "./hooks";
import CategoryDetails from "./CategoryDetails";

const showTrendingFirst = array => {
  return array.sort((a, b) => {
    if (a.label === "trending") return -1;
    if (b.label === "trending") return 1;
    return 0;
  });
};

const getCategories = data => {
  const activeCategories = data.filter(({ count }) => count > 0);
  return showTrendingFirst(activeCategories);
};

const filters = [
  "Recommended",
  "Least prices",
  "Highest prices",
  "Alphabetical"
];

const filterOptions = filters.map(filter => ({ label: filter, value: filter }));

export default function CelebritySearch() {
  let history = useHistory();
  let location = useLocation();

  const { data: categories } = useGetCategories();
  const displayCategories = getCategories(categories || []);
  const [filter, setFilter] = useState("");

  let categoryArray = displayCategories || [];
  useEffect(() => {
    if (categoryArray.length > 0) {
      if (location.pathname === "/") {
        history.replace("/c/trending");
      }
    }
  }, [categoryArray.length]);

  return (
    <Box
      p={[5, 8, 6]}
      mt={8}
      mb={12}
      maxW={["100%", "100%", "100%", "1152px"]}
      mx="auto"
    >
      <Flex mb={5} align="center" justify="space-between">
        <Text flex={1} fontWeight="semibold" fontSize="2xl">
          Categories
        </Text>
        <Select
          defaultValue="Recommended"
          onChange={value => setFilter(value.value)}
          options={filterOptions}
          w={["172px", "214px"]}
        />
      </Flex>
      <Route path="/c/:slug">
        {displayCategories.length > 0 && (
          <CategoryDetails
            {...{
              history,
              filter,
              displayCategories
            }}
          />
        )}
      </Route>
    </Box>
  );
}

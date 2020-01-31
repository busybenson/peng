import {
  Avatar,
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useTheme
} from "@chakra-ui/core";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import isMobile from "ismobilejs";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import IsolatedScroll from "react-isolated-scroll";
import { root_url, useGetCategories } from "../celebrity-ui/hooks";

const customStyle = theme => ({
  container: {
    flexGrow: 1,
    position: "relative"
  },
  containerOpen: {
    zIndex: 2
  },
  suggestionsContainer: {},
  suggestionsContainerOpen: {
    position: "absolute",
    maxHeight: 300,
    overflowY: "scroll",
    borderWidth: `${theme.borderWidths["2xs"]}`,
    borderColor: `${theme.colors.pink["400"]}`,
    marginTop: 4,
    marginBottom: 5,
    borderRadius: "6px",
    left: 0,
    right: 0
  },
  suggestionsList: {
    borderRadius: "4px",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  suggestion: {
    display: "block",
    cursor: "pointer"
  }
  // suggestionFirst: "react-autosuggest__suggestion--first",
  // suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
  // sectionContainer: "react-autosuggest__section-container",
  // sectionContainerFirst: "react-autosuggest__section-container--first",
  // sectionTitle: "react-autosuggest__section-title"
});

// const shouldRenderWhat = (suggestions, value, children) => {
//   if (suggestions.length === 0 && value === "") {
//     return (
//       <div className="example_suggest">Try typing something like Jide</div>
//     );
//   } else if (suggestions.length === 0 && value !== "") {
//     return "We couldn't find any celebrity";
//   } else {
//     return children;
//   }
// };

const AutoComplete = ({
  options = [],
  hasLoadedData,
  currency = "₦",
  iconProps = { size: "28px", name: "search", pl: 2, mt: 6, color: "pink.400" },
  inputProps = {
    placeholder: "Type a celebrity...",
    borderColor: "gray.300",
    fontSize: "xl",
    height: 16,
    size: "lg",
    focusBorderColor: "pink.400",
    autoFocus: true
  },
  onChange,
  value: valueProp = "",
  ...rest
}) => {
  const { data: categories } = useGetCategories();
  const [value, setValue] = useState(valueProp);
  const [suggestions, setSuggestions] = useState(options);
  const theme = useTheme();

  /////////////////////////////

  function getSuggestions(value) {
    return hasLoadedData
      ? options.filter(celebrity =>
          celebrity.nickname
            .toLowerCase()
            .startsWith(value.trim().toLowerCase())
        )
      : [];
  }

  // function getSuggestions1(value) {
  //   const inputValue = value.trim().toLowerCase();
  //   const inputLength = inputValue.length;
  //   let count = 0;

  //   return inputLength === 0
  //     ? []
  //     : options.filter(celebrity => {
  //         const keep =
  //           count < 5 &&
  //           celebrity.nickname.toLowerCase().slice(0, inputLength) ===
  //             inputValue;

  //         if (keep) {
  //           count += 1;
  //         }

  //         return keep;
  //       });
  // }

  /////////////////////////////

  const renderInputComponent = inputProps => (
    <InputGroup>
      <InputLeftElement>
        <Icon {...iconProps} />
      </InputLeftElement>
      <Input {...inputProps} />
    </InputGroup>
  );

  /////////////////////////////

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.nickname, query);
    const parts = parse(suggestion.nickname, matches);
    let photo = root_url + suggestion.picture;
    return (
      <Stack
        px={4}
        py={3}
        isInline
        bg={isHighlighted ? "pink.50" : "white"}
        align="center"
      >
        <Avatar size="md" name={suggestion.nickname} src={photo} />
        <Box>
          <Text fontSize="lg" lineHeight="none">
            {parts.map((part, index) => {
              return part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              );
            })}
          </Text>
          <Text isTruncated fontSize="xs" lineHeight="short">
            {suggestion.profession}
          </Text>
          <Text opacity={0.8} fontSize="xs" lineHeight="short">
            <span style={{ fontFamily: "sans-serif" }}>{currency}</span>
            {suggestion.price.toLocaleString()}
          </Text>
        </Box>
      </Stack>
    );
  }

  /////////////////////////////

  function renderSuggestionsContainer({ containerProps, children }) {
    const { ref, ...restContainerProps } = containerProps;
    const callRef = isolatedScroll => {
      if (isolatedScroll !== null) {
        ref(isolatedScroll.component);
      }
    };

    return (
      <IsolatedScroll ref={callRef} {...restContainerProps}>
        {children}
      </IsolatedScroll>
    );
  }

  /////////////////////////////

  function storeInputReference(autosuggest) {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  }

  /////////////////////////////

  function getSuggestionValue(suggestion) {
    return suggestion.nickname;
  }

  /////////////////////////////

  const handleInputChange = (_, { newValue }) => {
    setValue(newValue);
  };

  /////////////////////////////

  // function renderSuggestionsContainer({ containerProps, children, query }) {
  //   return (
  //     <Box {...containerProps} mt={5}>
  //       {shouldRenderWhat(suggestions, value, children)}
  //     </Box>
  //   );
  // }

  /////////////////////////////

  return (
    <Box w="100%" {...rest}>
      <Autosuggest
        ref={storeInputReference}
        theme={customStyle(theme)}
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        focusInputOnSuggestionClick={!isMobile}
        onSuggestionsFetchRequested={({ value }) => {
          setValue(value);
          setSuggestions(getSuggestions(value));
          onChange && onChange(value);
        }}
        onSuggestionSelected={(_, { suggestionValue }) =>
          console.log("Selected: " + suggestionValue)
        }
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={{
          value: value,
          onChange: handleInputChange,
          ...inputProps
        }}
        highlightFirstSuggestion={true}
      />
    </Box>
  );
};

export default AutoComplete;

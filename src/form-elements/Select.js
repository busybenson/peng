import { Box, CloseButton, Flex, Icon, useTheme } from "@chakra-ui/core";
import React from "react";
import ReactSelect from "react-select";

const sizeOptions = {
  xl: 16,
  lg: 12,
  md: 10,
  sm: 8
};

const generateStateColors = (
  isFocused,
  isInvalid,
  variantColor,
  isDisabled,
  colors
) => {
  if (isInvalid) {
    return {
      borderColor: colors.red["500"],
      boxShadow: isFocused ? `0 0 0 2px ${colors.red["200"]}` : "none",
      "&:hover": { borderColor: colors.red["500"] }
    };
  } else if (isFocused) {
    return {
      boxShadow: `0 0 0 1px ${colors[variantColor]["500"]}`,
      borderColor: `${colors[variantColor]["500"]}`
      // borderWidth: "2xs"
    };
  } else if (isDisabled) {
    return {
      borderColor: colors.gray["200"],
      backgroundColor: colors.gray["200"]
    };
  } else {
    return {
      borderColor: colors.gray["200"],
      "&:hover": { borderColor: colors.gray["300"] }
    };
  }
};

const selectStyles = (
  { colors, fontSizes, sizes, borderWidths, radii, shadows },
  props
) => {
  return {
    control: (base, { isFocused, isDisabled }) => ({
      ...base,
      borderWidth: props.isInvalid ? borderWidths["xs"] : borderWidths["2xs"],
      borderColor: props.isInValid ? "red.500" : `${props.variantColor}.500`,
      minHeight: sizes[sizeOptions[props.size]],
      cursor: props.isSearchable ? "text" : "initial",
      borderRadius: radii.md,
      transition: "all 0.2s ease-in-out",
      ...generateStateColors(
        isFocused,
        props.isInvalid,
        props.variantColor,
        isDisabled,
        colors
      )
    }),
    placeholder: (base, { isDisabled }) => ({
      ...base,
      fontSize: fontSizes[props.fontSize],
      color: isDisabled
        ? colors.gray["200"]
        : props.isSearchable
        ? colors.gray["400"]
        : colors.gray["400"]
    }),
    singleValue: (base, { isDisabled }) => ({
      ...base,
      fontSize: fontSizes[props.fontSize],
      color: isDisabled ? colors.gray["200"] : colors.gray["700"],
      whiteSpace: "pre-wrap",
      overflow: "visible"
    }),
    valueContainer: base => ({
      ...base,
      padding: !props.isMulti ? `0 16px` : `4px 8px`,
      overflow: "visible"
    }),
    input: base => ({
      ...base,
      fontSize: fontSizes[props.fontSize],
      overflow: "visible"
    }),
    menu: base => ({
      ...base,
      boxShadow: shadows.lg,
      overflow: "visible",
      marginTop: 1,
      borderRadius: "4px",
      zIndex: 10
    }),
    option: base => ({
      ...base,
      cursor: "pointer",
      transition: "background-color 0.15s",
      whiteSpace: "pre-line",
      overflow: "visible"
    }),
    multiValue: base => ({
      ...base,
      backgroundColor: colors.gray["200"]
    })
  };
};

const IndicatorSeparator = () => null;

const DropdownIndicator = props => {
  let isOpen = props.selectProps.menuIsOpen;
  return (
    <Flex px="12px" align="center" justify="center">
      {props.selectProps.hideDropDown ? (
        <Box />
      ) : (
        <Icon
          name="chevron-down"
          color={props.isDisabled ? "gray.200" : "gray.400"}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
            transformOrigin: "50% 50%"
          }}
        />
      )}
    </Flex>
  );
};

const ClearIndicator = ({ clearValue }) => <CloseButton onClick={clearValue} />;

const pinkTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#FEE9F7",
    primary50: "#FCBEE7",
    primary75: "#F867C7",
    primary: "#F411A8"
  }
});

const getValue = (value, options) => {
  if (Array.isArray(value)) {
    return value.map(eachValue =>
      options.find(option => option.value === eachValue)
    );
  }

  if (typeof value === "string" || typeof value === "number") {
    return options.find(option => option.value === value);
  }
};

const Select = React.forwardRef((props, ref) => {
  const {
    size,
    fontSize,
    name,
    menuIsOpen,
    isInvalid,
    isDisabled,
    id,
    options,
    variantColor = "pink",
    className,
    isTealTheme,
    closeMenuOnSelect,
    hideSelectedOptions,
    isMulti,
    isOptionSelected,
    noOptionsMessage,
    onChange,
    onBlur,
    isSearchable,
    hideDropDown,
    placeholder,
    components,
    selectProps,
    defaultValue,
    value,
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <Box {...rest}>
      <ReactSelect
        menuPlacement="auto"
        ref={ref}
        styles={selectStyles(theme, {
          size,
          fontSize,
          isInvalid,
          isMulti,
          isSearchable,
          variantColor
        })}
        components={{
          IndicatorSeparator,
          DropdownIndicator,
          ClearIndicator,
          ...components
        }}
        theme={pinkTheme}
        value={getValue(value, options)}
        defaultValue={getValue(defaultValue, options)}
        onChange={onChange}
        {...{
          id,
          noOptionsMessage,
          options,
          menuIsOpen,
          isDisabled,
          name,
          isMulti,
          onBlur,
          isSearchable,
          hideDropDown,
          hideSelectedOptions,
          isOptionSelected,
          placeholder
        }}
        {...selectProps}
      />
    </Box>
  );
});

Select.defaultProps = {
  size: "md",
  isSearchable: false
};

export default Select;

/** @jsx jsx */
import { Box, Icon } from "@chakra-ui/core";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { keycodes } from "../keycodes";

const ratingSize = {
  xl: 24,
  lg: 18,
  md: 16,
  sm: 12,
  xs: 10
};

const Star = styled(Box)`
  transition: width, transform 0.3s;

  .star-first {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    color: ${props => props.emptyColor};
    user-select: none;
    opacity: ${props => (props.allowHalf ? 1 : 0)};

    .half & {
      width: 50%;
    }

    .almost-full & {
      width: 75%;
    }

    .less-than-half & {
      width: 25%;
    }
  }

  .full & {
    .star-first,
    .star-second {
      color: inherit;
    }
  }

  .half &,
  .almost-full &,
  .less-than-half & {
    .star-first {
      color: inherit;
    }
  }

  .star-first,
  .star-second {
    color: ${props => props.emptyColor};
    transition: transform 0.3s ease-in-out, width 0.2s ease-in-out;
    user-select: none;
  }

  ${props =>
    !props.isReadOnly &&
    css`
      cursor: pointer;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:focus {
        outline: 0 !important;
      }
    `}

  &:focus {
    outline: 0 !important;
  }
`;

export const Rate = ({
  shape = "half",
  allowHalf = true,
  size = "md",
  isReadOnly,
  activeColor = "yellow.500",
  emptyColor = "gray.50",
  ...rest
}) => {
  return (
    <Box
      position="relative"
      d="inline-block"
      as="li"
      className={shape}
      color={activeColor}
      {...rest}
    >
      <Star
        role="radio"
        tabIndex="0"
        allowHalf={allowHalf}
        isReadOnly={isReadOnly}
        emptyColor={emptyColor}
      >
        <div className="star-first">
          <Icon
            name="star"
            style={{ width: ratingSize[size], height: ratingSize[size] }}
          />
        </div>
        <div className="star-second">
          <Icon
            name="star"
            style={{ width: ratingSize[size], height: ratingSize[size] }}
          />
        </div>
      </Star>
    </Box>
  );
};

const determineIcon = (value, index) => {
  let currentIndex = index;
  let remainder = value - currentIndex;
  if (remainder >= 1) {
    return "full";
  } else if (remainder <= 0.5 && remainder > 0.4) {
    return "half";
  } else if (remainder > 0.5 && remainder < 1) {
    return "almost-full";
  } else if (remainder > 0 && remainder < 0.4) {
    return "less-than-half";
  } else {
    return "zero";
  }
};

const Rating = ({
  value = 1,
  size = "lg",
  onChange,
  spacing = 1,
  isReadOnly,
  activeColor = "yellow.500",
  ...rest
}) => {
  const [rate, setRate] = React.useState(value);
  const [tempRate, setTempRate] = React.useState(0);
  const [useValue, setUseValue] = React.useState(true);
  let dummyArray = [...new Array(5)];

  React.useEffect(() => {
    setUseValue(true);
    setRate(value);
  }, [value]);

  const handleClick = index => {
    setRate(index + 1);
    setUseValue(true);
    onChange && onChange(index + 1);
  };

  const handleMouseOver = index => {
    setUseValue(false);
    setTempRate(index + 1);
  };

  const handleMouseLeave = () => {
    setUseValue(true);
    setTempRate(rate);
  };

  const handleKeyDown = e => {
    setUseValue(true);
    if (e.keyCode === keycodes._RIGHT) {
      setRate(rate + 0.5);
    } else if (e.keyCode === keycodes._LEFT) {
      setRate(rate - 0.5);
    } else if (e.keyCode === keycodes._ENTER) {
      onChange && onChange(rate);
    }
  };

  const determineShape = index => {
    if (useValue) {
      return determineIcon(rate, index);
    } else {
      return determineIcon(tempRate, index);
    }
  };

  return (
    <Box as="ul" onMouseLeave={handleMouseLeave} {...rest}>
      {dummyArray.map((_, index) => {
        let interactiveProps = {
          ...(!isReadOnly && {
            onClick: () => handleClick(index),
            onMouseEnter: () => handleMouseOver(index),
            onKeyDown: handleKeyDown
          })
        };

        return (
          <Rate
            key={index}
            size={size}
            isReadOnly={isReadOnly}
            activeColor={activeColor}
            shape={determineShape(index)}
            mr={index + 1 === dummyArray.length ? 0 : spacing}
            {...interactiveProps}
          />
        );
      })}
    </Box>
  );
};

export default Rating;

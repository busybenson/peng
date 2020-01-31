import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  PseudoBox,
  Radio,
  RadioButtonGroup,
  Stack,
  Text,
  Textarea
} from "@chakra-ui/core";
import { Field, Formik } from "formik";
import React from "react";
import { boolean, object, string } from "yup";
import { root_url, useGetCeleb } from "../celebrity-ui/hooks";
import Rating from "../data-display/Rating";
import Navigation from "../external-pages/NavigationBar";
import { useMedia } from "../utils/hooks";

const inputProps = {
  size: "lg",
  focusBorderColor: "pink.400",
  errorBorderColor: "red.500",
  variantColor: "pink",
  _placeholder: { color: "gray.300" },
  fontSize: "16px"
};

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, value, children, ...rest } = props;
  return (
    <PseudoBox
      ref={ref}
      display="inline-block"
      _focus={{ outline: "none" }}
      {...rest}
    >
      <Radio variantColor="pink" {...inputProps} isChecked={isChecked}>
        {children}
      </Radio>
    </PseudoBox>
  );
});

let options = ["Someone else", "Myself"];
let typeOptions = options.map(option => ({ label: option, value: option }));

let initialValue = {
  type: "Someone else",
  receiver: "",
  sender: "",
  email: "",
  phone: "",
  instructions: "",
  makePrivate: false
};

let validationSchema = object().shape({
  type: string(),
  receiver: string().required("Enter receiver's name"),
  sender: string().when("type", {
    is: "Someone else",
    then: string().required("Enter sender's name"),
    otherwise: string()
  }),
  email: string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: string().required("Phone is required"),
  instructions: string().required("Instructions are required"),
  isVideoPrivate: boolean()
});

let placeholders = {
  receiver: {
    label: type => (type === "Someone else" ? "To" : "My name is"),
    placeholder: "Dolapo"
  },
  sender: {
    label: "From",
    placeholder: "Moyo"
  },
  email: {
    label: type =>
      type === "Someone else" ? "Delivery email" : "Email address",
    placeholder: "Email to send video"
  },
  phone: {
    label: type =>
      type === "Someone else" ? "Receiver's phone" : "Phone number",
    placeholder: "2348012345678"
  },
  instructions: {
    label: nickname =>
      nickname
        ? `Instructions for ${nickname} are`
        : "Instructions for the video",
    placeholder:
      "It's my wife's birthday, she really loves you. I'll like you to wish her a happy birthday."
  },
  makePrivate: {
    label: "Don't make video public on PENG"
  }
};

let commonProps = ({ name }, { touched, errors }) => ({
  ...placeholders[name],
  isInvalid: Boolean(touched[name] && errors[name]),
  errorMessage: errors[name]
});

const allowedKeys = [8, 13, 9, 37, 39];
export const handleKeyDown = (e, onKeyDown) => {
  let preventCondition =
    (!allowedKeys.includes(e.keyCode) && e.keyCode < 48) || e.keyCode > 57;

  if (preventCondition) {
    e.preventDefault();
    return;
  } else {
    onKeyDown && onKeyDown(e);
  }
};

const Booking = ({
  wrapperProps = { maxW: ["100%", "100%", "100%", "100%", "80%"], mx: "auto" }
}) => {
  const { data, hasData } = useGetCeleb("omotolajolade");
  const isMobile = useMedia("(max-width: 420px)");
  return (
    <Box>
      <Navigation hideBorder={isMobile ? false : true} />
      {hasData && (
        <Box d={["block", "block", "block", "none"]} bg="gray.50">
          <Box px={[5, 6]} py={[6, 8]} {...wrapperProps}>
            <CelebritySummary {...data} />
          </Box>
        </Box>
      )}
      <Box {...wrapperProps} px={[5, 8]}>
        <Grid
          templateColumns={["none", "none", "none", "3fr 2fr"]}
          mt={[8, 8, 8, 6]}
          mb={[12, 12, 12, 10]}
          columnGap={12}
        >
          <BookingForm {...data} />
          <Box d={["none", "none", "none", "block"]}>
            <BookingSummary {...data} {...{ hasData }} />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
export default Booking;

const BookingForm = ({
  nickname,
  value,
  price = 4000,
  currency = "₦",
  spacing = "24px",
  onSubmit,
  ...rest
}) => {
  const handleSubmit = values => {
    debugger;
    onSubmit && onSubmit(values);
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={value || initialValue}
      onSubmit={handleSubmit}
    >
      {({ values, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Heading mb={6}>I'm booking for</Heading>
            <Stack spacing={spacing} {...rest}>
              <Field name="type">
                {({ field, form }) => (
                  <FormControl>
                    <RadioButtonGroup
                      isInline
                      spacing={spacing}
                      onChange={value => form.setFieldValue(field.name, value)}
                      value={field.value}
                    >
                      {typeOptions.map((option, index) => (
                        <CustomRadio key={index} value={option.value}>
                          {option.label}
                        </CustomRadio>
                      ))}
                    </RadioButtonGroup>
                  </FormControl>
                )}
              </Field>
              <Box />
              <Flex direction={["column", "row"]}>
                <Field name="receiver">
                  {({ field, form }) => (
                    <FormControl
                      flex={1}
                      isInvalid={commonProps(field, form).isInvalid}
                    >
                      <FormLabel>
                        {commonProps(field, form).label(values.type)}
                      </FormLabel>
                      <Input
                        {...field}
                        {...inputProps}
                        placeholder={commonProps(field, form).placeholder}
                      />
                      <FormErrorMessage>
                        {commonProps(field, form).errorMessage}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {values.type === "Someone else" ? (
                  <>
                    <Box w="20px" h={spacing} />
                    <Field name="sender">
                      {({ field, form }) => (
                        <FormControl
                          flex={1}
                          isInvalid={Boolean(
                            commonProps(field, form).isInvalid
                          )}
                        >
                          <FormLabel>
                            {commonProps(field, form).label}
                          </FormLabel>
                          <Input
                            {...field}
                            {...inputProps}
                            placeholder={commonProps(field, form).placeholder}
                          />
                          <FormErrorMessage>
                            {commonProps(field, form).errorMessage}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </>
                ) : (
                  <>
                    <Box d={["none", "block"]} w="20px" h={spacing} />
                    <Box flex={1} />
                  </>
                )}
              </Flex>

              <Flex direction={["column", "row"]}>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      flex={1}
                      isInvalid={Boolean(commonProps(field, form).isInvalid)}
                    >
                      <FormLabel>
                        {commonProps(field, form).label(values.type)}
                      </FormLabel>
                      <Input
                        type="email"
                        {...field}
                        {...inputProps}
                        placeholder={commonProps(field, form).placeholder}
                      />
                      <FormErrorMessage>
                        {commonProps(field, form).errorMessage}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box w="20px" h={spacing} />
                <Field name="phone">
                  {({ field, form }) => (
                    <FormControl
                      flex={1}
                      isInvalid={Boolean(commonProps(field, form).isInvalid)}
                    >
                      <FormLabel>
                        {commonProps(field, form).label(values.type)}
                      </FormLabel>
                      <Input
                        type="tel"
                        onKeyDown={handleKeyDown}
                        {...field}
                        {...inputProps}
                        placeholder={commonProps(field, form).placeholder}
                      />
                      <FormErrorMessage>
                        {commonProps(field, form).errorMessage}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Field name="instructions">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={Boolean(commonProps(field, form).isInvalid)}
                  >
                    <FormLabel>
                      {commonProps(field, form).label(nickname)}
                    </FormLabel>
                    <Textarea
                      height="6rem"
                      p={4}
                      resize="none"
                      {...inputProps}
                      {...field}
                      {...commonProps(field, form)}
                      onChange={({ target }) =>
                        form.setFieldValue(field.name, target.value)
                      }
                    />
                    <FormErrorMessage>
                      {commonProps(field, form).errorMessage}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box />

              <Field name="makePrivate">
                {({ field, form }) => (
                  <FormControl
                    flex={1}
                    isInvalid={Boolean(commonProps(field, form).isInvalid)}
                  >
                    <Checkbox
                      {...field}
                      {...inputProps}
                      size="md"
                      {...commonProps(field, form)}
                    >
                      {commonProps(field, form).label}
                    </Checkbox>
                    <FormErrorMessage>
                      {commonProps(field, form).errorMessage}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box w={["100%", "50%"]}>
                <Button isFullWidth mt={8} type="submit" {...inputProps}>
                  Book now for {currency + price.toLocaleString()}
                </Button>
              </Box>
            </Stack>
          </form>
        );
      }}
    </Formik>
  );
};

BookingForm.defaultProps = {
  onSubmit: data => alert(JSON.stringify(data))
};

const CelebritySummary = ({ nickname, profession, picture, rating = 4.9 }) => {
  const photo = root_url + picture;
  return (
    <Stack isInline>
      <Flex direction="column" justify="space-between" flex={1} mr={5}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {nickname}
          </Text>
          <Text fontSize="sm" isTruncated opacity={0.8}>
            {profession}
          </Text>
        </Box>
        <Stack isInline align="center">
          <Rating isReadOnly size="sm" />
          <Text fontSize="sm" mt={1} opacity={0.8}>
            ({rating}/5)
          </Text>
        </Stack>
      </Flex>

      <Box h={20} rounded="md" overflow="hidden">
        <Image h="100%" objectFit="cover" src={photo} />
      </Box>
    </Stack>
  );
};

const BookingSummary = ({
  price = 4000,
  picture,
  currency = "₦",
  nickname = "Celeb",
  rating,
  profession,
  hasData
}) => {
  return (
    <Box position="sticky" top={15} maxWidth="400px">
      <Box rounded="lg" borderWidth="sm" borderColor="pink.50" p={[5, 6]}>
        {hasData && (
          <>
            <CelebritySummary {...{ nickname, profession, picture, rating }} />
            <Divider mt={6} mb={4} />
            <Stack isInline justify="space-between" opacity={0.8}>
              <Text>Price</Text>
              <Text>{currency + price.toLocaleString()}</Text>
            </Stack>
            <Divider mt={4} mb={6} />
          </>
        )}
        <NextSteps {...{ nickname }} />
      </Box>
    </Box>
  );
};

export const NextSteps = ({ nickname }) => {
  return (
    <PseudoBox position="relative">
      <Box
        borderLeftWidth="2xs"
        borderColor="pink.100"
        bottom="20%"
        margin="0 auto"
        position="absolute"
        zIndex="hide"
        left="10px"
        top="52px"
      />
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        What happens next?
      </Text>
      <Stack isInline align="baseline" mb={6} minH="40px" spacing={5}>
        <Box py={2} bg="white">
          <Icon name="time" color="pink.500" size="20px" />
        </Box>

        <Text flex={1} opacity={0.8}>
          <b>{nickname}</b> has 7 days to complete your request.
        </Text>
      </Stack>
      <Stack isInline align="baseline" mb={6} minH="40px" spacing={5}>
        <Box py={2} bg="white">
          <Icon name="receipt" color="pink.500" size="20px" />
        </Box>

        <Text flex={1} opacity={0.8}>
          Your receipt and order updates will be sent to the{" "}
          <b>delivery email.</b>
        </Text>
      </Stack>
      <Stack isInline align="baseline" minH="40px" spacing={5}>
        <Box py={2} bg="white">
          <Icon name="email-message" color="pink.500" size="20px" />
        </Box>

        <Text flex={1} opacity={0.8}>
          When your request is completed, <b>we'll email you a link</b> to view,
          share, or download your PENG.
        </Text>
      </Stack>
    </PseudoBox>
  );
};

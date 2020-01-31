import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from "@chakra-ui/core";
import { Field, Formik } from "formik";
import React, { useContext } from "react";
import { object, string } from "yup";
import PasswordInput from "../form-elements/PasswordInput";
import { createUrl } from "../celebrity-ui/hooks";
import { AppContext } from "./AppProvider";

let initialValue = {
  email: "",
  password: ""
};

let validationSchema = object().shape({
  email: string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: string().required("Enter a password")
});

let placeholders = {
  email: {
    label: "Email address",
    placeholder: "Your email"
  },
  password: {
    label: "Password",
    placeholder: "Type your password"
  }
};

let commonProps = ({ name }, { touched, errors }) => ({
  ...placeholders[name],
  isInvalid: touched[name] && errors[name],
  errorMessage: errors[name]
});

const LoginForm = ({ value, onSubmit, spacing = "24px" }) => {
  const { setAuthToken } = useContext(AppContext);
  let [loading, setLoading] = React.useState(false);

  function onFormSubmit(data) {
    setLoading(true);

    fetch(createUrl(`/rest-auth/login/`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(res => {
        const token = res;
        localStorage.setItem("token", token.key);
        setAuthToken(token.key);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
      });

    onSubmit(data).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={value || initialValue}
      onSubmit={onFormSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Stack spacing={spacing}>
              <Field
                name="email"
                render={({ field, form }) => (
                  <FormControl isInvalid={commonProps(field, form).isInvalid}>
                    <FormLabel>{commonProps(field, form).label}</FormLabel>
                    <Input
                      type="email"
                      {...field}
                      focusBorderColor="pink.400"
                      placeholder={commonProps(field, form).placeholder}
                    />
                    <FormErrorMessage>
                      {commonProps(field, form).errorMessage}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <Box />

              <Field
                name="password"
                render={({ field, form }) => (
                  <FormControl isInvalid={commonProps(field, form).isInvalid}>
                    <FormLabel>{commonProps(field, form).label}</FormLabel>
                    <PasswordInput
                      {...field}
                      focusBorderColor="pink.400"
                      placeholder={commonProps(field, form).placeholder}
                    />
                    <FormErrorMessage>
                      {commonProps(field, form).errorMessage}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
            </Stack>

            <Button
              mt={spacing}
              type="submit"
              isFullWidth
              size="lg"
              variantColor="pink"
              isLoading={loading}
              // isDisabled={!isComplete}
            >
              Log in
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

LoginForm.defaultProps = {
  onSubmit: data => {
    // alert(JSON.stringify(data))
  }
};

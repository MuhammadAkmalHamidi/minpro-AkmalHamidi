import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Axios from "axios";
import { CloseIcon, EmailIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),

  email: Yup.string().email("email not valid").required("email is required"),

  phone: Yup.number()
    .min(11, "Minimal 11 Number")
    .required("Phone Number is required"),

  password: Yup.string()
    .matches(/^(?=.*[A-Z])/, "Password Must Have 1 Capital")
    .matches(/^(?=.*(\W|_))/, "Password Must Have 1 Symbol")
    .required("Password Is Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password Not Match")
    .required("Confirm Password Is Required"),
});

export const Regis = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate()

  const submitHandle = async (data) => {
    try {
      data.FE_URL= window.location.origin
      const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/", data);
      console.log(data);
      alert("check your email to verify your acount")
      alert("if you has to verify acount, You can click Login button to login your acount")
    } catch (error) {
      alert("field to register. Please try again");
    }
  };
  const initialValues = {
    email: "",
    password: "",
    username: "",
    phone: "",
    confirmPassword: "",
  };

  const close = () => {
    navigate("/")
  }

  return (
    <Flex
      justifyContent={"center"}
      p={"40px"}
      w={"100%"}
      h={"100vh"}
      bgGradient={"linear(to-r, blue.300 , red.200)"}
    >
      <Box
        p={"50px"}
        w={"600px"}
        h={"650px"}
        border={"3px solid rgba(255,255,255,0.4)"}
        borderRadius={"20px"}
        boxShadow={"0px 0px 10px white"}
      >
        <Flex
          fontSize={"25px"}
          fontWeight={"bold"}
          mb={"20px"}
          color={"white"}
          textShadow={"0px 0px 15px white"}
          justifyContent={"center"}
        >
          Sign Up
        </Flex>
        <Flex justifyContent={"center"}>
          <Formik
            onSubmit={(values) => {
              submitHandle(values);
            }}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form>
              <FormControl>
                <ErrorMessage
                  component="div"
                  name="email"
                  style={{ color: "red" }}
                />
                <Flex mb={"30px"}>
                  <FormLabel color={"white"}>
                    <EmailIcon
                      ml={"5px"}
                      mr={"10px"}
                      mt={"15px"}
                      color={"white"}
                    />
                  </FormLabel>
                  <Input
                    as={Field}
                    borderBottomRadius={"0px"}
                    borderEndColor={"rgba(0,0,0,0.0)"}
                    borderStartColor={"rgba(0,0,0,0.0)"}
                    borderTopColor={"rgba(0,0,0,0.0)"}
                    color={"white"}
                    _hover={{}}
                    _active={{ border: "rgba(0,0,0,0.1" }}
                    focusBorderColor="none"
                    placeholder="Email"
                    borderBottom={"1px solid"}
                    name="email"
                  />
                </Flex>
              </FormControl>

              <FormControl>
                <ErrorMessage
                  component="div"
                  name="username"
                  style={{ color: "red" }}
                />
                <Flex>
                  <FormLabel color={"white"}>
                    <Avatar
                      boxSize={"20px"}
                      mt={"10px"}
                      bgColor={"rgba(0,0,0,0)"}
                      color={"white"}
                      mr={"15px"}
                      mb={"30px"}
                    />
                  </FormLabel>
                  <Input
                    as={Field}
                    borderBottomRadius={"0px"}
                    borderEndColor={"rgba(0,0,0,0.0)"}
                    borderStartColor={"rgba(0,0,0,0.0)"}
                    borderTopColor={"rgba(0,0,0,0.0)"}
                    color={"white"}
                    _hover={{}}
                    _active={{ border: "rgba(0,0,0,0.1" }}
                    focusBorderColor="none"
                    placeholder="username"
                    borderBottom={"1px solid"}
                    name="username"
                  />
                </Flex>
              </FormControl>
              <FormControl>
                <ErrorMessage
                  component="div"
                  name="phone"
                  style={{ color: "red" }}
                />
                <Flex>
                  <FormLabel color={"white"}>
                    <PhoneIcon
                      mb={"30px"}
                      ml={"5px"}
                      mr={"10px"}
                      mt={"15px"}
                      color={"white"}
                    />
                  </FormLabel>
                  <Input
                    as={Field}
                    borderBottomRadius={"0px"}
                    borderEndColor={"rgba(0,0,0,0.0)"}
                    borderStartColor={"rgba(0,0,0,0.0)"}
                    borderTopColor={"rgba(0,0,0,0.0)"}
                    color={"white"}
                    _hover={{}}
                    _active={{ border: "rgba(0,0,0,0.1" }}
                    focusBorderColor="none"
                    placeholder="Phone Number"
                    borderBottom={"1px solid"}
                    name="phone"
                  />
                </Flex>
              </FormControl>

              <FormControl color={"white"} mb={"30px"}>
                <ErrorMessage
                  component="div"
                  name="password"
                  style={{ color: "red" }}
                />
                <Flex>
                  <FormLabel>
                    <LockIcon ml={"5px"} mr={"15px"} />
                  </FormLabel>

                  <InputGroup size="md">
                    <Input
                      as={Field}
                      borderBottomRadius={"0px"}
                      borderEndColor={"rgba(0,0,0,0.0)"}
                      borderStartColor={"rgba(0,0,0,0.0)"}
                      borderTopColor={"rgba(0,0,0,0.0)"}
                      color={"white"}
                      _hover={{}}
                      type={show ? "text" : "password"}
                      _active={{ border: "rgba(0,0,0,0.1" }}
                      focusBorderColor="none"
                      placeholder="Password"
                      borderBottom={"1px solid"}
                      name="password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>

              <FormControl color={"white"} mb={"30px"}>
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                  style={{ color: "red" }}
                />
                <Flex>
                  <FormLabel>
                    <LockIcon mt={"10px"} ml={"5px"} mr={"15px"} />{" "}
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      as={Field}
                      borderBottomRadius={"0px"}
                      borderEndColor={"rgba(0,0,0,0.0)"}
                      borderStartColor={"rgba(0,0,0,0.0)"}
                      borderTopColor={"rgba(0,0,0,0.0)"}
                      color={"white"}
                      _hover={{}}
                      type={show ? "text" : "password"}
                      _active={{ border: "rgba(0,0,0,0.1" }}
                      focusBorderColor="none"
                      placeholder="Confirm Password"
                      borderBottom={"1px solid"}
                      name="confirmPassword"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
              <Flex justifyContent={"center"}>
                <Button
                  mr={"30px"}
                  bgColor={"rgba(255,255,255,0.4)"}
                  color={"white"}
                  type="submit"
                >
                  Verify
                </Button>
                <Button
                  bgColor={"rgba(255,255,255,0.4)"}
                  color={"white"}
                  type="submit"
                  as={Link}
                  to={"/login"}
                >
                  Login
                </Button>
              </Flex>
            </Form>
          </Formik>
        </Flex>
      </Box>
      <CloseIcon
        onClick={close}
        _hover={{ transform: "scale(1.3)" }}
        transition={"0.3s"}
        cursor={"pointer"}
        color={"white"}
        ml={"20px"}
        mt={"5px"}
      />
    </Flex>
  );
};

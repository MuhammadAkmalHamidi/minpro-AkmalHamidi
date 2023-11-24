import {
  Box,
  Heading,
  Flex,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { CloseIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import  Axios  from "axios";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/acountSlice";

export const Login = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
  
    email: Yup.string().email("email not valid").required("email is required"),
  
    password: Yup.string()
      .matches(/^(?=.*[A-Z])/, "Password Must Have 1 Capital")
      .matches(/^(?=.*(\W|_))/, "Password Must Have 1 Symbol")
      .required("Password Is Required"),
    });

  const onLogin = async () => {
    try {
      const response = await Axios.post(`https://minpro-blog.purwadhikabootcamp.com/api/auth/login`)
      console.log(response);
      dispatch(setValue(response.data.isAccountExist))
      localStorage.setItem("token",response.data.token)
      navigate("/")

      
    } catch (error) {
      console.log(error);
    }

  };

  const close = () => {
    navigate("/")
  }

  return (
    <Flex
      className="bg"
      w={"100%"}
      h={"100vh"}
      bgGradient={"linear(to-r, blue.300 , red.200)"}
      //   bgColor={"blue.200"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box
        boxShadow={"0px 0px 20px white"}
        bgColor={"rgba(255,255,255,0.10)"}
        width={"500px"}
        height={"500px"}
        mt={"100px"}
        borderRadius={"25px"}
      >
        <Box
          width={"100%"}
          height={"100px"}
          bgColor={"rgba(255,255,255,0.250)"}
          borderTopRadius={"25px"}
          display={"flex"}
          justifyContent={"center"}
          margin
        >
          <Heading
            textShadow={"0px 0px 10px white"}
            mt={"30px"}
            fontWeight={"light"}
            color={"white"}
          >
            CUSTOMER LOGIN
          </Heading>
        </Box>
        <Box
          pb={"20px"}
          pr={"70px"}
          pl={"70px"}
          w={"100%"}
          h={"300px"}
          mt={"80px"}
        >
          <Formik 
            initialValues={{
              email:"",
              password:""
            }}
            validationSchema={validationSchema}
            onSubmit={(value, action) => {
              onLogin(value)
            }}
          >
            <Form>
              <Box>
                <FormControl>
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
                      name="email"
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
                    />
                  </Flex>
                  {/* <ErrorMessage name="" /> */}
                </FormControl>
                <FormControl color={"white"} mb={"30px"}>
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
              </Box>
              <Flex mt={"20px"} width={"100%"}>
                <Box width={"200px"}>
                  <Text
                    color={"white"}
                    cursor={"pointer"}
                    textShadow={"0px 0px 5px white"}
                    as={Link} to={"/verify"}
                  >
                    Forget Password?
                  </Text>
                </Box>
                <Box
                  ml={"100px"}
                  width={""}
                  cursor={"pointer"}
                  color={"White"}
                  fontWeight={"light"}
                  textShadow={"0px 0px 5px white"}
                  as={Link}
                  to="/signUp"
                >
                  Sign Up
                </Box>
              </Flex>
              <Box display={"flex"} justifyContent={"center"} mt={"50px"}>
                <Button
                  boxShadow={"0px 0px 7px white"}
                  color={"white"}
                  bgColor={"rgba(255,255,255,0.300)"}
                  h="50px"
                  w={"200px"}
                  size="sm"
                  fontWeight={"light"}
                  textShadow={"0px 0px 7px white"}
                  fontSize={"25px"}
                  type="submit"
                >
                  Login
                </Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
      <CloseIcon
        onClick={close}
        _hover={{ transform: "scale(1.3)" }}
        transition={"0.3s"}
        cursor={"pointer"}
        color={"white"}
        ml={"20px"}
        mt={"100px"}
      />
    </Flex>
  );
};

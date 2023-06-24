import { Avatar, Box, Button, Flex, FormControl, Heading, Input, Show, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { PicChange } from "../components/changeimg";

export const ChangePassword = () => {

    const token = localStorage.getItem("token")
    const dataUser = useSelector((state) => state.user.value)

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .matches(/^(?=.*[A-Z])/, "Password Must Have 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Have 1 Symbol")
            .required("Current Password Is Required"),


        password: Yup.string()
            .required("New Password Is Required")
            .matches(/^(?=.*[A-Z])/, "Password Must Have 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Have 1 Symbol"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password Not Match")
            .required("Confirm Password Is Required"),
    })

    const handleClick = async (data) => {
        const headers = {
            "Authorization": `Bearer ${token}`
        }

        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass`, data,
                { headers }
            )
            alert("password has been change")
        } catch (error) {
            console.log(error);
        }
    }
    const initialValues = {
        currentPassword: "",
        password: "",
        confirmPassword: ""
    }

    return (
        <Box>
            <Navbar />
            <Box pt={"75px"}>
                <Flex justifyContent={"center"}>
                    <Heading mt={"10px"} color={"blue.200"} textShadow={"0px 0px 3px"}>
                        My Account
                    </Heading>
                </Flex>
                <Flex w={"100%"} h={"500px"} mt={"20px"} justifyContent={"center"}>
                    <Flex
                        bgGradient={"linear(to-r, blue.300 , red.200)"}
                        w={"70%"}
                        h={"550px"}
                        p={"15px"}
                        borderRadius={"20px"}
                        shadow={"inner"}
                    >
                        <Flex w={"200%"} mt={"20px"}>
                            <Box
                                mr={"15px"}
                                mt={"50px"}
                                ml={"20px"}
                                color={"white"}
                                p={"25px"}
                                border={"2px solid rgba(255,255,255,0.3)"}
                                bgColor={"rgba(255, 255, 255, 0.3)"}
                                w={"300px"}
                                height={"430px"}
                                borderRadius={"20px"}
                                boxShadow={"0px 0px 15px white"}
                            >
                                <Box>
                                    <Flex justify={"center"}>
                                        <Avatar bgColor={"rgba(0,0,0,0)"} boxSize={"100px"} src={`https://minpro-blog.purwadhikabootcamp.com/${dataUser.imgProfile}`} />
                                    </Flex>
                                    <Flex justifyContent={"center"}>
                                        <Heading textShadow={"0px 0px 5px white"}>{dataUser.username}</Heading>
                                    </Flex>
                                    <Flex
                                        mb={"20px"}
                                        textShadow={"0px 0px 3px white"}
                                        justifyContent={"center"}
                                    >
                                        <Text>{dataUser.email} </Text>
                                    </Flex>
                                    <PicChange />
                                    <Box textShadow={"0px 0px 3px white"} fontSize={"20px"}>
                                        <Flex cursor={"pointer"}>
                                            <PlusSquareIcon mt={"6px"} mr={"5px"} />{" "}
                                            <Text as={Link} to={"/acount"} mb={"10px"}>Profile</Text>
                                        </Flex>
                                        <Flex as={Link} to={"/myblog"} cursor={"pointer"}>
                                            <PlusSquareIcon mt={"6px"} mr={"5px"} />{" "}
                                            <Text mb={"10px"}>My Blog</Text>
                                        </Flex>
                                        <Flex cursor={"pointer"}>
                                            <Avatar
                                                mt={"3px"}
                                                mr={"3px"}
                                                bgColor={"rgba(0,0,0,0)"}
                                                boxSize={"23px"}
                                            />
                                            <Text as={Link} to={"/profileSetting"} mb={"10px"}>Profile Setting</Text>
                                        </Flex>
                                        <Flex cursor={"pointer"}>
                                            <EditIcon
                                                boxSize={"18px"}
                                                ml={"3px"}
                                                mt={"6px"}
                                                mr={"6px"}
                                            />
                                            <Text as={Link} to={"/changePassword"} >Change Password</Text>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                fontWeight={"bold"}
                                color={"blue.200"}
                                p={"40px"}
                                borderRadius={"20px"}
                                mt={"50px"}
                                w={"550px"}
                                height={"430px"}
                                bgColor={"white"}
                                boxShadow={"0px 0px 10px white"}
                            >
                                <Formik
                                    onSubmit={(values) => {
                                        handleClick(values)
                                    }}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                >
                                    <Form>
                                        <Box mb={"30px"}>
                                            <FormControl>
                                                <ErrorMessage
                                                    component="div"
                                                    name="currentPassword"
                                                    style={{ color: "red" }}
                                                />
                                                <Text>Current Password</Text>
                                                <Input name="currentPassword" as={Field} />
                                            </FormControl>
                                        </Box>

                                        <Box mb={"30px"}>
                                            <FormControl>
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    style={{ color: "red" }}
                                                />
                                                <Text>New Password</Text>
                                                <Input name="password" as={Field} />
                                            </FormControl>
                                        </Box>

                                        <Box mb={"30px"}>
                                            <FormControl>
                                                <ErrorMessage
                                                    component="div"
                                                    name="confirmPassword"
                                                    style={{ color: "red" }}
                                                />
                                                <Text>Confirm Password</Text>
                                                <Input name="confirmPassword" as={Field} />
                                            </FormControl>
                                        </Box>
                                        <Button bgColor={"blue.200"} color={"white"} _hover={{ bgColor: "blue.400" }} type="submit" >Change</Button>
                                    </Form>
                                </Formik>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}
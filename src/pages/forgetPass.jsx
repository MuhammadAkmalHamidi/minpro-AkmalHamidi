import { Box, Button, Flex, FormControl, Heading, Input, border } from "@chakra-ui/react"
import Axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const ForgetPass = () => {
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("email not valid")
    })

    const handleSubmit = async (data) => {
        try {
            data.FE_URL = window.location.origin
            const response = await Axios.put(`https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass`, data)
            alert("check your email to verify")
        } catch (error) {
            console.log(error);
        }
    }
    const initialValues = {
        email: ""
    }

    return (
        <Box bgGradient={"linear(to-r, blue.300 , red.200)"} w={"100%"} h={"100vh"}>
            <Formik
                onSubmit={(values) => {
                    handleSubmit(values)
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
                        <Flex justifyContent={"center"}>
                            <Box bgColor={"rgba(255,255,255,0.2)"} pr={"40px"} pl={"40px"} pt={"30px"} mt={"100px"} borderRadius={"10px"} boxShadow={"0px 0px 10px white"} w={"400px"} h={"500px"}>
                                <Flex>
                                    <Heading textAlign={"center"} color={"white"} textShadow={" 0px 0px 5px white"}>
                                        are you forgot password?
                                    </Heading>
                                </Flex>
                                <Flex justifyContent={"center"} mb={"20px"} mt={"100px"}>
                                    <Box color={"white"}>
                                        Enter your email to verify :
                                        <Input _focus={{boxShadow:"none", borderColor:"white"}} border={"None"} borderBottom={"1px solid white"} borderRadius={"0px"} placeholder="Email" mt={"20px"} as={Field} name="email" ></Input>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"center"}>
                                    <Button mr={"30px"} bgColor={"rgba(255,255,255,0.5)"} boxShadow={"0px 0px 10px white"} color={"blue.400"} type="submit">Verify</Button>
                                    <Button bgColor={"rgba(255,255,255,0.5)"} boxShadow={"0px 0px 10px white"} color={"blue.400"} as={Link} to={"/login"}>Back to login</Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </FormControl>
                </Form>
            </Formik>
        </Box>
    )
}
import { Box, Button, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react"
import Axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useParams } from "react-router-dom"
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .matches(/^(?=.*[A-Z])/, "Password Must Have 1 Capital")
        .matches(/^(?=.*(\W|_))/, "Password Must Have 1 Symbol")
        .required("Password Is Required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password Not Match")
        .required("Confirm Password Is Required")
})

export const ResetPassword = () => {

    const { token } = useParams()
    const handleSubmit = async (data) => {
        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass`, data,
                {
                    headers: { Authorization: `bearer ${token}` }
                }
            )
            alert("reset password success")
        } catch (error) {
            console.log(error);
            alert("salah codingan")
        }
    }
    const initialValues = {
        password: "",
        confirmPassword: ""
    }
    return (
        <Flex justifyContent={"center"} bgGradient={"linear(to-r, blue.300 , red.200)"}h={"100vh"} >
            <Box boxShadow={"0px 0px 10px white"} borderRadius={"20px"} color={"white"} bgColor={"rgba(255,255,255,0.2)"} h={"fit-content"} p={"20px"} mt={"200px"}>
                <Flex justifyContent={"center"}>
                    <Heading mb={"40px"}>Input your new password</Heading>
                </Flex>
                <Formik
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <FormControl mb={"20px"}>
                            <Text>New Password</Text>
                            <ErrorMessage
                                component="div"
                                name="password"
                                style={{ color: "red" }}
                            />
                            <Input name="password" as={Field} />
                        </FormControl>

                        <FormControl mb={"20px"}>
                            <Text>Confirm Password</Text>
                            <ErrorMessage
                                component="div"
                                name="confirmPassword"
                                style={{ color: "red" }}
                            />
                            <Input name="confirmPassword" as={Field} />
                        </FormControl>
                        <Flex justifyContent={"center"}>
                            <Button _hover={{boxShadow:"0px 0px 10px white", transition:"0.3s"}} bgColor={"blue.200"} color={"white"} type="submit">
                                Change
                            </Button>
                        </Flex>
                    </Form>
                </Formik>
            </Box>
        </Flex>
    )
}
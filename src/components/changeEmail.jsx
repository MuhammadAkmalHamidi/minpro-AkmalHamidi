import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react"
import Axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup";

export const ChangeEmail = () => {

    const token = localStorage.getItem("token")

    const validationSchema = Yup.object().shape({
        currentEmail: Yup.string()
            .email("current email not valid")
            .required("current email is required"),

        newEmail: Yup.string()
        .email("new email not valid")
        .required("new email is required"),
    })


    const changeEmail = async (data) => {
        const headers = {
            "Authorization": `Bearer ${token}`
        }

        try {
            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail", data,
                { headers }
            )
            console.log(response.data);

        } catch (error) {
            console.log(error);
            alert('codingannya salah blok!')
        }
    }
    const initialValues = {
        currentEmail: "",
        newEmail: ""
    }

    return (
        <Box mt={"20px"}>
            <Formik onSubmit={(value) => {
                changeEmail(value)
            }}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                <Form>
                    <FormControl color={"blue.200"} fontWeight={"bold"}>
                        <Flex justifyContent={"center"}>
                            <Box mr={"10px"}>
                                <Text>Current Email</Text>
                                <ErrorMessage
                                    component="div"
                                    name="currentEmail"
                                    style={{ color: "red" }}
                                />
                                <Input name="currentEmail" as={Field} w={"250px"} />
                            </Box>
                            <Box>
                                <Text>New Email</Text>
                                <ErrorMessage
                                    component="div"
                                    name="newEmail"
                                    style={{ color: "red" }}
                                />
                                <Input name="newEmail" as={Field} w={"250px"} />
                            </Box>
                        </Flex>
                    </FormControl>
                    <Button mt={"10px"} bgColor={"blue.200"} color={"white"} _hover={{bgColor:"blue.400"}} type="submit" >Change</Button>
                </Form>
            </Formik>
        </Box>
    )
}
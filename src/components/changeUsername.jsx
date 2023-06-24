import { InfoIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react"
import Axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";

export const ChangeUsername = () => {
    
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const dataUser = useSelector((state) => state.user.value)
    
    const validationSchema = Yup.object().shape({
        currentUsername: Yup
        .string()
        .required("Current Username is required!"),
        
        newUsername: Yup
        .string()
        .required("New Username is required!")
    })

    const handleSubmit = async (data) => {
        const headers = {
            "Authorization": `Bearer ${token}`
        }
    
        try {
            data.FE_URL = window.location.origin
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername`, data,
                { headers }
            )
            localStorage.removeItem("token")
            navigate("/login")
            // console.log(response.value.username);
        } catch (error) {
            console.log(error);
        }
    }
    const initialValues = {
        currentUsername: "",
        newUsername: ""
    }

    return(
        <Formik onSubmit={(value) => {
            handleSubmit(value)
        }}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            <Form>
                <Box>
                    <Flex color={"blue.200"} fontWeight={"bold"}>
                        <FormControl mr={"10px"}>
                            Current Username
                            <ErrorMessage
                                component="div"
                                name="currentUsername"
                                style={{ color: "red" }}
                            />
                            <Input color={"black"} as={Field} name="currentUsername" />
                        </FormControl>

                        <FormControl>
                            New Username
                            <ErrorMessage
                                component="div"
                                name="newUsername"
                                style={{ color: "red" }}
                            />
                            <Input color={"black"} as={Field} name="newUsername" />
                        </FormControl>
                    </Flex>

                    <Button mt={"10px"} bgColor={"blue.200"} color={"white"} _hover={{bgColor:"blue.400"}} type="submit" >Change</Button>
                </Box>
            </Form>
        </Formik>
    )

}


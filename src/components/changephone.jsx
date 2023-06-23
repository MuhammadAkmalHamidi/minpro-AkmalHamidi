import { InfoIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react"
import Axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useSelector } from "react-redux"
import * as Yup from "yup";

export const ChangePhone = () => {
    
    const token = localStorage.getItem("token")
    const dataUser = useSelector((state) => state.user.value)
    
    const validationSchema = Yup.object().shape({
        currentPhone: Yup.number()
        .min(11, "Minimal 11 Number")
        .required("Phone Number is required"),
        
        newPhone: Yup.number()
        .min(11, "Minimal 11 Number")
        .required("Phone Number is required")
    })

    const handleSubmit = async (data) => {
        const headers = {
            "Authorization": `Bearer ${token}`
        }
    
        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone`, data,
                { headers }
            )
            // console.log(response.value.username);
        } catch (error) {
            console.log(error);
        }
    }
    const initialValues = {
        currentPhone: "",
        newPhone: ""
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
                            Current Phone Number
                            <ErrorMessage
                                component="div"
                                name="currentPhone"
                                style={{ color: "red" }}
                            />
                            <Input color={"black"} as={Field} name="currentPhone" />
                        </FormControl>

                        <FormControl>
                            New Phone Number
                            <ErrorMessage
                                component="div"
                                name="newPhone"
                                style={{ color: "red" }}
                            />
                            <Input color={"black"} as={Field} name="newPhone" />
                        </FormControl>
                    </Flex>

                    <Button mt={"10px"} bgColor={"blue.200"} color={"white"} _hover={{bgColor:"blue.400"}} type="submit" >Change</Button>
                </Box>
            </Form>
        </Formik>
    )

}


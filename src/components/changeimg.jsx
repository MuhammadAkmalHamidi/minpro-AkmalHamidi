import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Text, useToast } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const PicChange = () => {
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const toast = useToast()

    const initialState = {
        file: ""
    }

    const ImageSchema = Yup.object().shape({
        file: Yup.mixed()

    })


    const onImage = async (data) => {
        try {
            data.FE_URL = window.location.origin
            const image = new FormData()
            image.append("file", file)
            const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded", image, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            toast({
                title: "Success!",
                description: "Profile picture successfuly changed!",
                status: "success",
                duration: 1500,
                isClosable: true
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
            console.log(response);
        } catch (err) {
            console.log(err);
            toast({
                title: "Failed!",
                description: err.response.data.err,
                status: "error",
                duration: 3500,
                isClosable: true
            })
        }
    }
    return (
        <Formik initialValues={initialState} validationSchema={ImageSchema}
            onSubmit={(value, action) => {
                onImage(value)
            }}>
            {() => {
                return (
                    <Box as={Form} mt="10px" encType="multipart/form-data">
                        <Flex>
                            <InputGroup>
                                <Field name="file">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="file" color="white">Change Profile</FormLabel>
                                            <Input {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    setFile(e.target.files[0])
                                                }} type="file" id="file" h="29px" w="150px" color="white" size="s"
                                                borderRadius="5px" />
                                        </FormControl>
                                    )}
                                </Field>
                                <Button bgColor={"blue.200"} color={"white"} type="submit" mt="30px" h="30px" w="90px">Submit</Button>
                            </InputGroup>
                        </Flex>
                    </Box>
                )
            }}
        </Formik>
    )
}
import {
    Flex,
    HStack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Text,
    Select,
    Textarea,
    Button,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { Link } from "react-router-dom";

export function CreateBlog() {
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null); // ditambah
    useEffect(() => {
        Axios.get(
            "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
        ).then((res) => {
            console.log(res.data);
            setCategory(res.data);
        });
    }, []);


    const createblogSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"),
        country: Yup.string().required("Country is required"),
        CategoryId: Yup.string().required("Category is required"),

        file: Yup.mixed().required("img is req"),
        keywords: Yup.string().required("Keyword is required"),
    });
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();
            const { title, content, country, CategoryId, keywords, url } = value;
            console.log({ value });
            formData.append("file", file);
            formData.append(
                "data",
                JSON.stringify({ title, content, country, CategoryId, keywords, url })
            );
            console.log([...formData]);
            const respone = await Axios.post(
                "https://minpro-blog.purwadhikabootcamp.com/api/blog",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "multipart/form-data",
                }
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box>
            <Navbar />
            <>
                <Formik
                    initialValues={{
                        title: "",
                        content: "",
                        country: "",
                        CategoryId: "",
                        url: "",
                        keywords: "",
                        file: null,
                    }}
                    validationSchema={createblogSchema}
                    onSubmit={(value, action) => {
                        handleSubmit(value);
                    }}
                >
                    {(props) => {
                        return (
                            <Form>
                                <Flex w={"1000px"} p={"100px"} >
                                    <Flex mr={"100px"}>
                                        <Box boxShadow={"0px 0px 5px gray"} borderRadius={"10px"} p={"20px"} color={"white"} bgGradient={"linear(, blue.200 , red.200)"}>
                                            <Box>
                                                <Field name="title">
                                                    {({ field }) => (
                                                        <FormControl>
                                                            <FormLabel htmlFor="title">Title</FormLabel>
                                                            <Input {...field} type="text" id="title" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    style={{ color: "red" }}
                                                    name="title"
                                                    component="div"
                                                />
                                            </Box>
                                            <Box>
                                                <Field name="country">
                                                    {({ field }) => (
                                                        <FormControl>
                                                            <FormLabel htmlFor="country">Country</FormLabel>
                                                            <Input {...field} type="text" id="country" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    style={{ color: "red" }}
                                                    name="country"
                                                    component="div"
                                                />
                                            </Box>

                                            <Box>
                                                <Field name="CategoryId">
                                                    {({ field }) => (
                                                        <FormControl>
                                                            <FormLabel htmlFor="CategoryId">Category</FormLabel>
                                                            <Select {...field} placeholder="Select option">
                                                                {category.map((value, index) => {
                                                                    return (
                                                                        <option key={index} value={value.id}>
                                                                            {value.name}
                                                                        </option>
                                                                    );
                                                                    // <Text key={index}> {value.name}</Text>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    style={{ color: "red" }}
                                                    name="CategoryId"
                                                    component="div"
                                                />
                                            </Box>
                                            <Box>
                                                <Field name="url">
                                                    {({ field }) => (
                                                        <FormControl>
                                                            <FormLabel htmlFor="url">Link</FormLabel>
                                                            <Input {...field} type="text" id="url" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Box>
                                            <Box>
                                                <Field name="file">
                                                    {({ field }) => (
                                                        <FormControl>
                                                            <FormLabel htmlFor="file">File</FormLabel>
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => { //implementasi untuk upload file ke backend
                                                                    field.onChange(e);
                                                                    setFile(e.target.files[0]);
                                                                }}
                                                                type="file"
                                                                id="file"
                                                            />
                                                        </FormControl>
                                                    )}
                                                </Field>

                                                <ErrorMessage
                                                    style={{ color: "red" }}
                                                    name="file"
                                                    component="div"
                                                />
                                            </Box>
                                        </Box>
                                    </Flex>
                                    <Flex w={"50%"}>
                                        <Box>
                                            <Box>
                                                <Field name="content">
                                                    {({ field }) => (
                                                        <FormControl >
                                                            <FormLabel color={"blue.300"} htmlFor="content">
                                                                Content
                                                            </FormLabel>
                                                            <Textarea mb={"20px"} boxShadow={"0px 0px 15px rgb(135,206,250)"} h={"300px"} w={"600px"} {...field} placeholder="Type Something..." type="text" id="content" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    style={{ color: "red" }}
                                                    name="content"
                                                    component="div"
                                                />
                                            </Box>
                                            <Box>

                                                <Field name="keywords">
                                                    {({ field }) => (
                                                        <FormControl>
                                                            <FormLabel color={"blue.300"} htmlFor="url">Keywords</FormLabel>
                                                            <Input mb={"10px"} boxShadow={"0px 0px 15px rgb(135,206,250)"} {...field} type="text" id="keywords" />
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    style={{ color: "red" }}
                                                    name="keywords"
                                                    component="div"
                                                />
                                            </Box>
                                            <Box>
                                                <Button isDisabled={!props.dirty} type="submit">
                                                    Submit
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Form>
                        );
                    }}
                </Formik>
            </>
        </Box>
    );
}

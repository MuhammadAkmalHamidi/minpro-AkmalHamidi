import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import Axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LatesBlog } from "../components/latesBlog"

export const Blog = () => {
    const params = useParams()
    const [data, getData] = useState()
    const getarticel = async (data) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`, data)
            getData(response.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getarticel()
    }, [])

    return (
        <Box w={"100%"} h={"100vh"}>
            <Navbar />
            <Flex pt={"50px"} pl={"100px"} pr={"100px"} justifyContent={"center"}>
                <Box p={"20px"} w={"fit-content"}>
                    <Box>
                        <Heading textShadow={"2px 2px 2px gray"} fontSize={"70px"} mb={"5px"} color={"blue.200"}>
                            {data?.title}
                        </Heading>
                    </Box>
                    <Box>
                        <Box maxW={"600px"} mt={"10px"} mb={"10px"}>
                            {data?.content}
                        </Box>
                        <Flex>
                            <Box mb={"50px"} fontSize={"13px"}>
                                {data?.User.username}  |  {data?.Category.name}  |  {data?.createdAt}
                            </Box>
                        </Flex>
                    </Box>
                    <Box w={"700px"} h={"400px"}>
                        <Image borderRadius={"20px"} boxSize={"400px"} src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`} />
                    </Box>
                </Box>
            </Flex>
            <LatesBlog />
        </Box>
    )
}
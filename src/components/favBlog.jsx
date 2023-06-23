import { Box, Flex, Heading, Image, Text, scroll } from "@chakra-ui/react"
import Axios from "axios"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
export const FavBlog = () => {


    const navigate = useNavigate()
    const [data, setData] = useState([])



    const favBlog = async () => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=2&orderBy=total_fav&sort=DESC`, data)
            setData(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (id) => {
        navigate(`/`)
        navigate(`blog/${id}`)
        window.location.reload()
    }
    useEffect(() => {
        favBlog()
    }, [])


    return (
        <Box>
            <Flex w={"1200px"}>
                <Heading color={"blue.200"}>Favorite Blog</Heading>
                <Box ml={"10px"} mt={"35px"} w={"1000px"} h={"2px"} bgColor={"blue.200"}></Box>
            </Flex>
            <Flex justifyContent={"center"}>
                <Flex bgColor={"rgb(135,206,250)"} mt={"20px"} borderRadius={"10px"} mb={"20px"} shadow={"inner"} p={"20px"} w={"900px"} h={"330px"} overflowX={"scroll"}>
                    <Flex color={"white"} textShadow={"0px 0px 5px white"} w={"1200px"}>
                        {data?.map(item => {
                            return (
                                <Flex cursor={"pointer"} onClick={() => handleClick(item.id)} boxShadow={"0px 0px 5px white"} bgColor={"rgba(255,255,255,0.3)"} borderRadius={"10px"} mt={"10px"} p={"5px"} mr={"10px"} w={"150px"} h={"250px"} _hover={{ transform: "scale(1.1)" }}>
                                    <Box h={"10px"}>
                                        <Flex position={"relative"} w={"140px"}>
                                            <Image boxShadow={"0px 0px 3px white"} h={"100px"} w={"200px"} borderRadius={"10px"} mr={"10px"} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                                        </Flex>
                                        <Flex mt={"10px"}>
                                            {item.title}
                                        </Flex>
                                        <Box mt={"10px"} fontSize={"10px"}>
                                            {item.updatedAt}
                                        </Box>
                                    </Box>
                                </Flex>
                            )
                        })}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { react, useEffect, useState } from "react";
import Axios from "axios";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { LatesBlog } from "../components/latesBlog";
import { FavBlog } from "../components/favBlog";
import { Footer } from "../components/footer";

export const Home = () => {

  const navigate = useNavigate()
  const [blog, setData] = useState([]);
  const getContent = async (data1) => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        data1
      );
      setData(response.data.result);
      // console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    navigate(`blog/${id}`)
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Box>
      <Navbar />
      <Flex justifyContent={"center"} pt={"100px"} bgColor={"rgba(0,0,0,0)"}>
        <Box bgColor={"rgba(0,0,0,0)"} boxShadow={"0px 3px 10px gray"} borderRadius={"20px"}>
          <Swiper
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true, }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {blog.map((item, index) => {
              return (
                <SwiperSlide key={index} onClick={() => handleClick(item.id)}>
                  <Image _hover={{transform:"scale(1.2)", transition:"0.3s", }} cursor={"pointer"} borderRadius={"20px"} position={"absolute"} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                  <Box mt={"300px"}>
                    <Box borderBottomRadius={"20px"} position={"relative"} w={"100%"} h={"100px"} bgColor={"rgba(135,206,250,0.9)"} textShadow={"0px 0px 5px white"} color={"white"} lineHeight={"100px"} fontSize={"25px"}>
                      {item.title}
                    </Box>
                  </Box>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>
      </Flex>
      <Flex justifyContent={"center"}>
        <Box mt={"50px"}>
            <LatesBlog />
            <FavBlog />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

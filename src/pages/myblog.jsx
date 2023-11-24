import { Avatar, Box, Flex, Heading, Image, Show, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { PicChange } from "../components/changeimg";

export const MyBlog = () => {

  const [blog, setBlog] = useState()
  const token = localStorage.getItem("token")
  const dataUser = useSelector((state) => state.user.value)
  const navigate = useNavigate()


  const myBlog = async () => {
    try {
      const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setBlog(response.data.result)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(blog);

  useEffect(() => {
    myBlog()
  }, [])

  const handleClick = (id) => {
    navigate("/")
    navigate(`/blog/${id}`)
  }

  return (
    <Box>
      <Navbar />
      <Box pt={"75px"}>
        <Flex justifyContent={"center"}>
          <Heading mt={"10px"} color={"blue.200"} textShadow={"0px 0px 3px"}>
            My Account
          </Heading>
        </Flex>
        <Flex w={"100%"} h={"500px"} mt={"20px"} justifyContent={"center"}>
          <Flex
            bgGradient={"linear(to-r, blue.300 , red.200)"}
            w={"70%"}
            h={"550px"}
            p={"15px"}
            borderRadius={"20px"}
            shadow={"inner"}
          >
            <Flex w={"200%"} mt={"20px"}>
              <Box
                mr={"15px"}
                mt={"50px"}
                ml={"20px"}
                color={"white"}
                p={"25px"}
                border={"2px solid rgba(255,255,255,0.3)"}
                bgColor={"rgba(255, 255, 255, 0.3)"}
                w={"300px"}
                height={"430px"}
                borderRadius={"20px"}
                boxShadow={"0px 0px 15px white"}
              >
                <Box>
                  <Flex justify={"center"}>
                    <Avatar bgColor={"rgba(0,0,0,0)"} boxSize={"100px"} src={`https://minpro-blog.purwadhikabootcamp.com/${dataUser.imgProfile}`} />
                  </Flex>
                  <Flex justifyContent={"center"}>
                    <Heading textShadow={"0px 0px 5px white"}>{dataUser.username}</Heading>
                  </Flex>
                  <Flex
                    mb={"20px"}
                    textShadow={"0px 0px 3px white"}
                    justifyContent={"center"}
                  >
                    <Text>{dataUser.email} </Text>
                  </Flex>
                  <PicChange />
                  <Box textShadow={"0px 0px 3px white"} fontSize={"20px"}>

                    <Flex cursor={"pointer"}>
                      <PlusSquareIcon mt={"6px"} mr={"5px"} />{" "}
                      <Text as={Link} to={"/acount"} mb={"10px"}>Profile</Text>
                    </Flex>

                    <Flex cursor={"pointer"}>
                      <PlusSquareIcon mt={"6px"} mr={"5px"} />{" "}
                      <Text as={Link} to={"/myblog"} mb={"10px"}>My Blog</Text>
                    </Flex>

                    <Flex >
                      <Avatar
                        mt={"3px"}
                        mr={"3px"}
                        bgColor={"rgba(0,0,0,0)"}
                        boxSize={"23px"}
                      />
                      <Text as={Link} to={"/profileSetting"} mb={"10px"}>Profile Setting</Text>
                    </Flex>

                    <Flex cursor={"pointer"}>
                      <EditIcon
                        boxSize={"18px"}
                        ml={"3px"}
                        mt={"6px"}
                        mr={"6px"}
                      />
                      <Text as={Link} to={"/changepassword"}>Change Password</Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
              <Box
                borderRadius={"20px"}
                mt={"50px"}
                w={"550px"}
                height={"430px"}
                bgColor={"white"}
                boxShadow={"0px 0px 10px white"}
                p={"20px"}
              >
                <Flex maxW={"500px"}>
                  {blog?.map((item, index) => {
                    return (
                      <Flex key={index}>
                        <Flex maxW={"300px"}>
                          <Box onClick={() => handleClick(item.id)} cursor={"pointer"} _hover={{ transform: "scale(0.9)", transition: "0.2s" }} shadow={"3px 3px 2px gray"} color={"white"} p={"5px"} mr={"10px"} bgColor={"blue.200"} borderRadius={"10px"}>
                            <Image borderRadius={"10px"} w={"300px"} shadow={"inner"} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                            <Flex justifyContent={"center"} textShadow={"0px 0px 3px white"}>
                              <Text> {item.title} </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      </Flex>
                    )
                  })}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box >
    </Box >
  )
}
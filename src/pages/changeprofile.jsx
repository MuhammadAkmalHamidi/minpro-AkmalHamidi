
import { Avatar, Box, Flex, Heading, Show, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { Profile } from "../components/myprofile";
import { Link } from "react-router-dom";
import { PicChange } from "../components/changeimg";

export const ChangeProfile = () => {

  const dataUser = useSelector((state) => state.user.value)

  return (
    <>
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
                      mb={"0px"}
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

                      <Flex as={Link} to={"/myblog"} cursor={"pointer"}>
                        <PlusSquareIcon mt={"6px"} mr={"5px"} />{" "}
                        <Text mb={"10px"}>My Blog</Text>
                      </Flex>
                      <Flex cursor={"pointer"}>
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
                >
                  <Profile />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
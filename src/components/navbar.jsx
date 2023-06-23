import { ChevronDownIcon, HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  transition,
  Avatar,
  Button,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import { transform } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

  const [value, setValue] = useState()
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const data = useSelector((state) => state.user.value)

  const category = async (data) => {
    try {
      const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory`, data)
      setValue(response.data)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect((value) => {
    category(value)
  }, [])

  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/")

  }

  return (
    <Flex
      position={"fixed"}
      boxShadow={"0px 0px 10px gray"}
      bgGradient={"linear(blue.400, blue.100)"}
      w={"100%"}
      h={"75px"}
      color={"white"}
      justifyContent={"space-between"}
      zIndex={"9999999"}
    >
      <Flex textShadow={"0px 0px 5px white"}>
        <Flex>
          <Box
            fontWeight={"light"}
            ml={"20px"}
            color={"white"}
            fontSize={"40px"}
          >
            BroLog
          </Box>
          <Flex mt={"25px"}>
            <Box
              _hover={{ color: "blue.500", textShadow: "0px 0px 20px white" }}
              cursor={"pointer"}
              ml={"100px"}
              as={Link} to={"/"}
            >
              Home
            </Box>
            <Box
              _hover={{ color: "blue.500", textShadow: "0px 0px 20px white" }}
              cursor={"pointer"}
              ml={"100px"}
              as={Link} to={"/Sorry:("}
            >
              Trending
            </Box>
            <Box cursor={"pointer"} ml={"100px"}>
              <Menu>
                <MenuButton
                  transition="all 0.2s"
                  textShadow={"0px 0px 5px white"}
                  _hover={{ color: "blue.500", textShadow: "None" }}
                >
                  Category <ChevronDownIcon />
                </MenuButton>
                <MenuList mt={"20px"} position={"fixed"} bgColor={"blue.300"}>
                  {value?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id} _hover={{ bgColor: "blue.500", transition: "0.3s", textShadow: "0px 0px 5px white" }} mb={"10px"} bgColor={"blue.300"}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      {token ? (
        <>


          <Menu>
            <MenuButton mr={"40px"}
              _hover={{ color: "blue.500", transition: "0.3s" }}
              cursor={"pointer"}
            >
              <HamburgerIcon boxSize={"40px"} />
            </MenuButton>
            <MenuList mr={"20px"} bgColor={"blue.300"}>
              <Box mb={"30px"} ml={"60px"}>
                <Avatar ml={"15px"} bgColor={"rgba(0,0,0,0)"} src={data.imgProfile} />
                <Box>
                  {data.username}
                </Box>
              </Box>
              <Box mb={"20px"}>
                <Text textShadow={"0px 0px 5px white"} as={Link} to={"/acount"} ml={"10px"} cursor={"pointer"} w={"90px"} _hover={{ textShadow: "0px 0px 0px", color: "blue.500", transition: "0.3s" }}>
                  My Account
                </Text>
              </Box>
              <Box>
                <Text textShadow={"0px 0px 5px white"} as={Link} to={"/createBlog"} ml={"10px"} cursor={"pointer"} w={"90px"} _hover={{ textShadow: "0px 0px 0px", color: "blue.500", transition: "0.3s" }}>
                  Create Blog
                </Text>
              </Box>
              <Flex justifyContent={"center"}>
                <Button onClick={logOut} mt={"20px"} color={"blue.500"}>Log Out</Button>
              </Flex>
            </MenuList>
          </Menu>

        </>
      ) : (
        <>
          <Box ml={"400px"}>
            <Search2Icon
              mt={"25px"}
              _hover={{ color: "blue.500", transition: "0.3s" }}
              cursor={"pointer"}
              boxSize={"25px"}
            />
          </Box>
          <Flex>

            <Flex
              mt={"10px"}
              _hover={{
                boxShadow: "0px 0px 10px white",
                bgColor: "blue.500",
                color: "white",
                textShadow: "0px 0px 10px white",
              }}
              transition={"0.3s"}
              cursor={"pointer"}
              borderRadius={"15px"}
              mr={"20px"}
              lineHeight={"50px"}
              justifyContent={"center"}
              bgColor={"white"}
              color={"blue.200"}
              w={"70px"}
              h={"50px"}
              as={Link}
              to="/Login"
            >
              Login
            </Flex>
            <Flex
              mt={"10px"}
              _hover={{
                boxShadow: "0px 0px 10px white",
                bgColor: "blue.500",
                color: "white",
                textShadow: "0px 0px 10px white",
              }}
              transition={"0.3s"}
              cursor={"pointer"}
              borderRadius={"15px"}
              mr={"20px"}
              lineHeight={"50px"}
              justifyContent={"center"}
              bgColor={"white"}
              color={"blue.200"}
              w={"70px"}
              h={"50px"}
              as={Link}
              to="/signup"
            >
              Sign Up
            </Flex>
          </Flex> </>)}


    </Flex>
  );
};

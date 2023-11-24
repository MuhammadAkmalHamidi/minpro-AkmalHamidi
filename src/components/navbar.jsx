import { ChevronDownIcon, HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
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

  const dataUser = useSelector((state) => state.user.value)
  const [value, setValue] = useState()
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const data = useSelector((state) => state.user.value)

  const category = async (data) => {
    try {
      const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory`, data)
      setValue(response.data)
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

  const Search = () => {
    navigate("/search")
  }

  return (
    <Flex
      position={"fixed"}
      boxShadow={"0px 0px 10px gray"}
      bgGradient={"linear(to-r, blue.200, purple , red.200)"}
      w={"100%"}
      h={"75px"}
      color={"white"}
      justifyContent={"space-between"}
      zIndex={"9999999"}
    >
      <Flex>
        <Flex>
          <Box
            fontWeight={"light"}
            ml={"20px"}
            color={"white"}
            fontSize={"40px"}
            textShadow={"0px 0px 5px white"}
          >
            BroLog
          </Box>
          <Flex mt={"25px"}>
            <Box
              _hover={{ textShadow: "0px 0px 20px white", transition:"0.3s" }}
              cursor={"pointer"}
              ml={"100px"}
              as={Link} to={"/"}
            >
              Home
            </Box>
            <Box
             _hover={{ textShadow: "0px 0px 20px white", transition:"0.3s" }}
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
                  _hover={{ textShadow: "0px 0px 20px white", transition:"0.3s" }}
                >
                  Category <ChevronDownIcon />
                </MenuButton>
                <MenuList mt={"20px"} position={"fixed"} bgGradient={"linear(, blue.200 , red.200)"}>
                  {value?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id} _hover={{ bgColor: "rgba(0,0,0,0)", transition: "0.3s", textShadow: "0px 0px 5px white" }} mb={"10px"} bgColor={"rgba(0,0,0,0)"}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
            </Box>

            <Box ml={"450px"}>
            <Search2Icon
              _hover={{ transform:"scale(1.2)", transition: "0.3s" }}
              cursor={"pointer"}
              boxSize={"25px"}
              onClick={Search}
            />
          </Box>
          </Flex>
        </Flex>
      </Flex>

      {token ? (
        <>


          <Menu>
            <MenuButton mr={"40px"}
              _hover={{ transform:"scale(1.2)", transition: "0.3s" }}
              cursor={"pointer"}
            >
              <HamburgerIcon boxSize={"40px"} />
            </MenuButton>
            <MenuList mr={"20px"} bgGradient={"linear(, blue.200 , red.200)"}>
              <Box mb={"30px"} ml={"60px"}>
              <Avatar bgColor={"rgba(0,0,0,0)"} boxSize={"100px"} src={`https://minpro-blog.purwadhikabootcamp.com/${dataUser.imgProfile}`} />
                <Box>
                  {data.username}
                </Box>
              </Box>
              <Box mb={"20px"}>
                <Text  as={Link} to={"/acount"} ml={"10px"} cursor={"pointer"} w={"90px"} _hover={{ textShadow: "0px 0px 5px white", transform:"scale(1.2)", transition: "0.3s" }}>
                  My Account
                </Text>
              </Box>
              <Box>
                <Text as={Link} to={"/createBlog"} ml={"10px"} cursor={"pointer"} w={"90px"} _hover={{ textShadow: "0px 0px 5px white", transition: "0.3s" }}>
                  Create Blog
                </Text>
              </Box>
              <Flex justifyContent={"center"}>
                <Button onClick={logOut} mt={"20px"} color={"red.200"}>Log Out</Button>
              </Flex>
            </MenuList>
          </Menu>

        </>
      ) : (
        <>
          
          <Flex>

            <Flex
              mt={"10px"}
              _hover={{
                boxShadow: "0px 0px 10px white",
                textShadow: "0px 0px 10px white",
              }}
              transition={"0.3s"}
              cursor={"pointer"}
              borderRadius={"15px"}
              mr={"20px"}
              lineHeight={"50px"}
              justifyContent={"center"}
              bgColor={"white"}
              color={"red.200"}
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
                textShadow: "0px 0px 10px white",
              }}
              transition={"0.3s"}
              cursor={"pointer"}
              borderRadius={"15px"}
              mr={"20px"}
              lineHeight={"50px"}
              justifyContent={"center"}
              bgColor={"white"}
              color={"red.200"}
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

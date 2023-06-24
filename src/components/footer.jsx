import { Box, Flex, Heading, Image, Input, Text } from "@chakra-ui/react"   
import { Link } from "react-router-dom";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

export const Footer = () => {
    return (
        <Box p={"20px"} w={"100%"} h={"270px"} boxShadow={"0px 0px 5px gray"} bgGradient={"linear(to-r, blue.200, purple , red.200)"}>
            <Flex justifyContent={"center"}>
                <Box>
                    <Flex justifyContent={"center"}>
                        <Text fontSize={"30px"} fontWeight={"thin"} color={"white"} textShadow={"0px 0px 5px white"} mb={"10px"}>Our Social Media</Text>
                    </Flex>

                    <Flex fontSize={"30px"} color={"white"} mb={"20px"} justifyContent={"space-between"}>
                        <Box _hover={{transform:"scale(1.1)", transition:"0.3s"}} as={Link} to={"https://www.facebook.com/profile.php?id=100007457295251" } target="blank" ml={"100px"}>
                            <BsFacebook />
                        </Box>
                        <Box _hover={{transform:"scale(1.1)", transition:"0.3s"}} as={Link} to={"https://twitter.com/"} target="blank" >
                            <BsTwitter/>
                        </Box>
                        <Box _hover={{transform:"scale(1.1)", transition:"0.3s"}} as={Link} to={"https://www.instagram.com/hamidiakmall/"} target="blank" mr={"100px"}>
                            <BsInstagram />
                        </Box>
                    </Flex>

                    <Flex justifyContent={"center"}>
                        <Box w={"800px"} borderBottom={"2px solid white"}></Box>
                    </Flex>
                </Box>
            </Flex>
            <Flex justifyContent={"center"}>
                <Box>
                    <Flex justifyContent={"center"}>
                        <Text fontSize={"25px"} color={"white"} mt={"10px"}>
                            NEWSLETTER
                        </Text>
                    </Flex>
                    <Input placeholder="Input Your Email" type="email" boxShadow={"0px 0px 5px white"} w={"300px"} />
                </Box>
            </Flex>
        </Box>
    )
}
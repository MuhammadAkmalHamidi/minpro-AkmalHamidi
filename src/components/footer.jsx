import { Box, Flex, Heading, Image, Input, Text } from "@chakra-ui/react"
import image from "../assets/f.png";
import tweeter from "../assets/t.jpg";
import ig from "../assets/instagram-logo1.png";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <Box p={"20px"} w={"100%"} h={"270px"} boxShadow={"0px 0px 5px gray"} bgColor={"blue.200"}>
            <Flex justifyContent={"center"}>
                <Box>
                    <Flex justifyContent={"center"}>
                        <Heading color={"white"} mb={"10px"}>Our Social Media</Heading>
                    </Flex>

                    <Flex mb={"20px"} justifyContent={"center"}>
                        <Box as={Link} to={"https://www.facebook.com/profile.php?id=100007457295251" } target="blank" mr={"20px"}>
                            <Image  cursor={"pointer"} boxSize={"60px"} src={image} />
                        </Box>
                        <Box as={Link} to={"https://twitter.com/"} target="blank" mt={"5px"} mr={"30px"}>
                            <Image cursor={"pointer"} boxSize={"50px"} src={tweeter} />
                        </Box>
                        <Box as={Link} to={"https://www.instagram.com/hamidiakmall/"} target="blank" mt={"5px"}>
                            <Image cursor={"pointer"} boxSize={"50px"} src={ig} />
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
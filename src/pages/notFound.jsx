import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import img from "../assets/2678156.jpg";

export const NotFound = () => {
    return (
        <Flex justifyContent={"center"}>
            <Box color={"blue.400"}>
                <Image boxSize={"400px"} src={img} />
                <Flex justifyContent={"center"} mb={"10px"}>
                    <Heading>
                        I'm sorry for this page :(
                    </Heading>
                </Flex>
                <Flex justifyContent={"center"}>
                    <Text>
                        unfinished page created
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}
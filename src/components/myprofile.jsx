import { Box,Flex, Heading} from "@chakra-ui/react"
import { ChangeUsername } from "./changeUsername"
import { ChangeEmail } from "./changeEmail"
import { ChangePhone } from "./changephone"

export const Profile = () => {
    return (
        <Box>
            <Flex color={"blue.200"} mt={"10px"} justifyContent={"center"} fontWeight={"thin"}>
                <Heading>
                    Profile Setting
                </Heading>
            </Flex>
            <Box mt={"10px"} pr={"20px"} pl={"20px"}>
                <ChangeUsername />
                <ChangeEmail />
                <ChangePhone />
            </Box>
        </Box>
    )
}
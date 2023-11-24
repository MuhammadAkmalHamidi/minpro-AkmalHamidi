import { Box, Button, Flex } from "@chakra-ui/react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const handleSubmit = async () => {
    try {
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      alert("acount has been verified");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex w={"100%"} h={"100vh"} bgGradient={"linear(to-r, blue.300 , red.200)"}   justifyContent={"center"}>
      <Flex justifyContent={"center"}>
        <Box>
          <Flex
            color={"white"}
            textShadow={"0px 0px 5px white"}
            fontSize={"50px"}
            justifyContent={"center"}
            mt={"300px"}
          >
            Click This Button To Verify
          </Flex>
          <Flex
            justifyContent={"center"}
            mt={"10px"}
            borderRadius={"10px"}
            h={"200px"}
            w={"300px"}
            ml={"120px"}
          >
            <Button
              _hover={{ boxShadow: "0px 0px 10px white", transition: "0.3s" }}
              cursor={"pointer"}
              justifyContent={"center"}
              borderRadius={"10px"}
              color={"white"}
              textShadow={"0px 0px 5px white"}
              lineHeight={"70px"}
              bgColor={"rgba(255,255,255,0.2)"}
              w={"100px"}
              h={"70px"}
              onClick={handleSubmit}
            >
              Verification
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

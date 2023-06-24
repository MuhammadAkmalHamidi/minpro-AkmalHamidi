import { useState, useEffect } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import Axios from 'axios';
import { Navbar } from '../components/navbar';
import { LatesBlog } from '../components/latesBlog';
import { FavBlog } from '../components/favBlog';
import { Footer } from '../components/footer';

export const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory');
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog', {
                params: {
                    search: searchTerm,
                    category: selectedCategory,
                },
            });

            setSearchResults(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <Box>
            <Navbar />
            <Box p={"30px"} pt={"100px"}>
                <Flex color={"white"}>
                    <Box bgColor={"blue.200"} boxShadow={"0px 0px 10px gray"} p={"20px"} borderRadius={"20px"}>
                        <Flex justifyContent={"center"}>
                            <FormControl>
                                <FormLabel>Search Term</FormLabel>
                                <Input type="text" value={searchTerm} onChange={handleInputChange} />

                                <FormLabel mt={4}>Category</FormLabel>
                                <Select value={selectedCategory} onChange={handleCategoryChange}>
                                    <option style={{backgroundColor:"rgb(135,206,250)", border:"0px"}} value="">All</option>
                                    {categories.map((category) => (
                                        <option style={{backgroundColor:"rgb(135,206,250)", border:"0px"}} key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>

                                <Button mt={4} onClick={handleSearch}>
                                    Search
                                </Button>
                            </FormControl>
                        </Flex>
                    </Box>


                    <Box boxShadow={"0px 0px 15px gray"} borderRadius={"20px"} w={"1000px"} ml={"50px"} bgColor={"blue.200"} p={"30px"}>
                        {searchResults.map((item) => (
                            <Box cursor={"pointer"} _hover={{color:"blue.400" , transition:"0.3s"}} mb={"20px"} key={item.id}>
                                <ul>
                                    <li>
                                        <h3>{item.title}</h3>
                                    </li>
                                </ul>
                            </Box>
                        ))}
                    </Box>
                </Flex>
            </Box>

            <LatesBlog />
            <FavBlog />
            <Footer />

        </Box>
    );
};
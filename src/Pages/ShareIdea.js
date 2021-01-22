import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import React from "react";

const ShareIdea = () => {
  const [value, setValue] = React.useState("1");
  return (
    <Flex
      flexDirection="column"
      w="720px"
      background="#fff"
      p={5}
      my="auto"
      borderRadius="15px"
    >
      <Heading>Add Idea</Heading>
      <FormControl isRequired my={5}>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Title" />
        <FormLabel mt={5}>Description</FormLabel>
        <Textarea placeholder="Desc" />
        <FormLabel mt={5}>Category</FormLabel>
        <RadioGroup onChange={setValue} value={value} >
          <Stack direction="row">
            <Radio value="1">Web</Radio>
            <Radio value="2">Mobil</Radio>
            <Radio value="3">:D</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Button mt={4} alignSelf="flex-end" colorScheme="teal" padding={6}>
        +Add
      </Button>
    </Flex>
  );
};

export default ShareIdea;

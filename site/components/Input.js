import { useEffect, useState } from "react";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";

import postData from "../lib/postData";
import { sortByRatio } from "../lib/sortData";

export default function MyInput({ setData, colors, setColors }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v0/picks/combos`;
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    postData(url, colors).then((data) => {
      setData(data);
      sortByRatio(data.results.colorCombos);
    });
  }, [colors]);

  const addColor = async (event) => {
    event.preventDefault();
    console.log("executing addColor");
    if (colors.includes(inputVal)) {
      alert("That color already exists");
      setInputVal("");
      return;
    }
    if (/^#[0-9A-F]{6}$/i.test(inputVal)) {
      setColors((oldColors) => [...oldColors, inputVal]);
    } else {
      alert("Not a valid hex color");
    }
    setInputVal("");
  };

  function handleChange(event) {
    setInputVal(event.currentTarget.value.toUpperCase());
  }

  return (
    <VStack>
      <HStack mt={2}>
        <form onSubmit={addColor}>
          <Input
            size="sm"
            type="text"
            onChange={(event) => handleChange(event)}
            placeholder="Add a color "
            value={inputVal}
            bg={"white"}
          />
        </form>
        <Button
          size="sm"
          alignSelf={"right"}
          bg={"blue.600"}
          type={"submit"}
          onClick={addColor}
          color="white"
        >
          Add
        </Button>
      </HStack>
      <Text fontSize={"xs"} color="gray.500">
        Enter colors as 6-digit hex colors (ex: #FFFFFF)
      </Text>
    </VStack>
  );
}

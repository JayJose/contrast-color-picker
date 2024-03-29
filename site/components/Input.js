import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";

import { checkColorContrast } from "../lib/getCombos";
import { sortByRatio } from "../lib/sortData";

export default function MyInput({ setData, colors, setColors }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v0/picks/combos`;
  var [inputVal, setInputVal] = useState("");

  const addColor = async (event) => {
    event.preventDefault();
    // workaround for missing default value when using color picker
    // set a default value to black to match color picker
    if (!showText && inputVal === "") {
      inputVal = "#000000";
    }
    console.log("executing addColor");
    if (colors.includes(inputVal)) {
      alert("That color already exists");
      setInputVal("");
      return;
    }
    if (/^#[0-9A-F]{6}$/i.test(inputVal)) {
      setColors((oldColors) => [...oldColors, inputVal]);
      checkColorContrast(colors).then((data) => {
        setData(data);
        sortByRatio(data);
      });
    } else {
      alert("Not a valid hex color");
    }
    setInputVal("");
  };

  function handleChange(event) {
    setInputVal(event.currentTarget.value.toUpperCase());
  }

  const [showText, setShowText] = useState(true);

  return (
    <VStack>
      <HStack alignSelf={"start"} mt={2}>
        <Text fontSize={"sm"}>
          {showText ? "Show color picker" : "Show text input"}
        </Text>
        <Switch onChange={() => setShowText(!showText)}></Switch>
      </HStack>
      <HStack mt={2}>
        <form onSubmit={addColor}>
          <Input
            size="sm"
            minW="200px"
            type={showText ? "text" : "color"}
            onChange={(event) => handleChange(event)}
            placeholder="Add a color "
            value={inputVal}
            bg={"white"}
          />
        </form>
        <Button
          size="sm"
          alignSelf={"right"}
          bg={"gray.500"}
          type={"submit"}
          onClick={addColor}
          color="white"
        >
          Add
        </Button>
      </HStack>
      {showText ? (
        <Text fontSize={"xs"} color="gray.500">
          Enter colors as 6-digit hex colors (ex: #FFFFFF)
        </Text>
      ) : null}
    </VStack>
  );
}

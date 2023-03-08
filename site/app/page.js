"use client";
import { useEffect, useState } from "react";

// styling
import { Inter } from "next/font/google";
import styles from "./page.module.css";
const inter = Inter({ subsets: ["latin"] });

// chakra components
import { Container, VStack } from "@chakra-ui/react";

// custom components
import MyForm from "./components/Form";
import MyTable from "./components/Table";
import MyHeader from "./components/Header";

// helper functions
import postData from "./lib/postData";

// sample data
import sampleData from "./example.json";

export default function Home() {
  const [data, setData] = useState(sampleData);

  const url = "http://localhost:8000/api/v0/picks/combos";
  // useEffect(() => {
  //   console.log("running useEffect");
  //   postData(url, ["#FFFFFF", "#000000", "#FFF000"], setData);
  // }, []);

  return (
    <>
      <MyHeader></MyHeader>
      <Container maxW="container.xl" p={{ base: 0, md: 3 }}>
        <VStack
          h="95vh"
          w="100%"
          p={0}
          spacing={2}
          align="stretch"
          borderRadius={"10px"}
          overflowY={"auto"}
        >
          <MyForm setData={setData} />
          <MyTable data={data} />
        </VStack>
      </Container>
    </>
  );
}

import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "../components/Link";

const Home: NextPage = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Head>
        <title>Home | Desafio Next.js Imersão</title>
      </Head>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Home
      </Typography>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/posts">Posts</Link>
      </Box>
    </Box>
  );
};

export default Home;

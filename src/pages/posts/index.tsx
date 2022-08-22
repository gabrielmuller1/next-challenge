import {
  Box,
  capitalize,
  Pagination,
  Paper,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import slugify from "slugify";
import { Post } from "../../model";

const POSTS_PER_PAGE = 10;

interface PostsProps {
  data: Post[];
}

const Posts: NextPage<PostsProps, {}> = ({ data }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handlePostClick = (id: number, title: string) => {
    const slug = slugify(`${title} ${id}`, { lower: true });
    router.push(`/posts/${slug}`);
  };

  const renderPosts = () => {
    if (!data || data.length === 0) {
      return (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Nenhum post encontrado
        </Typography>
      );
    }
    return [...data]
      .reverse()
      .slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
      .map((post) => {
        let { body } = post;
        if (body.length > 100) {
          body = body.substring(0, 100) + "...";
        }
        return (
          <Grid key={post.id} xs={12} md={6}>
            <Paper
              onClick={() => handlePostClick(post.id, post.title)}
              sx={{
                p: 5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                {capitalize(post.title)}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", mt: 2, color: "#909090" }}
              >
                {body}
              </Typography>
            </Paper>
          </Grid>
        );
      });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Head>
        <title>Posts | Desafio Next.js Imersão</title>
      </Head>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Posts
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {renderPosts()}
      </Grid>
      <Pagination
        count={POSTS_PER_PAGE}
        page={page}
        onChange={handlePageChange}
        sx={{
          py: 5,
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      />
    </Box>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  const { data } = res;

  return { props: { data } };
}

export default Posts;

import { Box, capitalize, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import {
  GetServerSidePropsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import slugify from "slugify";
import { Comment, Post } from "../../model";

interface PostProps {
  data?: { post: Post; comments: Comment[] };
}

const Post: NextPage<PostProps, {}> = ({ data }) => {
  if (!data) {
    return (
      <Box sx={{ mt: 3 }}>
        <Head>
          <title>Post não encontrado | Desafio Next.js Imersão</title>
        </Head>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Post não encontrado
        </Typography>
      </Box>
    );
  }

  const { post, comments } = data;

  const renderPostBody = () => {
    return post.body.split("\n").map((line, index) => {
      return (
        <Typography
          key={index}
          variant="body1"
          component="p"
          sx={{ mt: 2, color: "#909090" }}
        >
          {capitalize(line)}
        </Typography>
      );
    });
  };

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Paper key={comment.id} sx={{ px: 5, py: 3, mt: 3 }}>
          <Typography variant="h5">{comment.email}</Typography>
          <Typography variant="h6">{comment.name}</Typography>
          <Typography variant="body1" component="p" sx={{ color: "#909090" }}>
            {comment.body}
          </Typography>
        </Paper>
      );
    });
  };

  const title = `${post.title} | Desafio Next.js Imersão`;

  return (
    <Box sx={{ py: 3 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        {capitalize(post.title)}
      </Typography>
      <Box sx={{ p: 5 }}>{renderPostBody()}</Box>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Comentários
      </Typography>
      <Box sx={{ my: 3 }}>{renderComments()}</Box>
    </Box>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );

  const { data } = response;

  return {
    paths: data.map((post: Post) => ({
      params: { slug: slugify(`${post.title} ${post.id}`, { lower: true }) },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug?: string }>) {
  if (!params?.slug) {
    return { props: { data: null } };
  }

  const id = params.slug.split("-").pop();
  try {
    const responsePost = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const post = responsePost.data;

    try {
      const responseComments = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const comments = responseComments.data;
      return { props: { data: { post, comments } } };
    } catch (e) {
      return { props: { data: { post, comments: [] } } };
    }
  } catch (e) {
    return { props: { data: null } };
  }
}

export default Post;

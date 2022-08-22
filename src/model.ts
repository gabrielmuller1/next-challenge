interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

enum PagesEnum {
  Home = "/",
  ListPosts = "/posts",
  Post = "/posts/[slug]",
  NotFound = "/404",
}

type Pages = keyof typeof PagesEnum;

type Page = `${PagesEnum}`;

export { PagesEnum };

export type { Post, Comment, Pages, Page };

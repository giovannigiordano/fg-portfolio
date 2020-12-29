import {GetStaticPaths, GetStaticProps} from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import PostList from "../../../components/PostList";
import config from "../../../lib/config";
import {countPosts, listPostContent, PostContent} from "../../../lib/posts";

type Props = {
  posts: PostContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({posts, pagination, page}: Props) {
  const url = `/posts/page/${page}`;
  const title = "All posts";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const page = parseInt(params.page as string);
  const posts = listPostContent(page, config.posts_per_page);
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    props: {
      page,
      posts,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: {page: (it + 2).toString()},
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

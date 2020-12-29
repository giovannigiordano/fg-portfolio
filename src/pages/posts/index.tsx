import {GetStaticProps} from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PostList from "../../components/PostList";
import config from "../../lib/config";
import {countPosts, listPostContent, PostContent} from "../../lib/posts";
import Head from "next/head";

type Props = {
  posts: PostContent[];
};
export default function Index({posts, pagination}: Props) {
  const url = "/posts";
  const title = "All posts";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = listPostContent(1);
  return {
    props: {
      posts,
    },
  };
};

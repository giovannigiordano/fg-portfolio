import {GetStaticProps} from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PostList from "../../components/PostList";
import config from "../../lib/config";
import {countWorks, listWorkContent, WorkContent} from "../../lib/works";
import Head from "next/head";

type Props = {
  works: WorkContent[];
};

const Works: React.FC<Props> = (props) => {
  const url = "/works";
  const title = "All works";

  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={props.works} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const works = listWorkContent(1);
  return {
    props: {
      works,
    },
  };
};

export default Works

import {GetStaticProps} from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PostList from "../../components/PostList";
import config from "../../lib/config";
import {countWorks, listWorkContent, WorkContent} from "../../lib/works";
import Head from "next/head";
import makeMasonry from "../../lib/masonry";

type Props = {
  works: WorkContent[];
};

const Works: React.FC<Props> = (props) => {
  const url = "/works";
  const title = "All works";
  const columns = makeMasonry(3, props.works)

  console.log(columns.map(column => column.map(work => work.thumbnail_kind)))
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <div style={{display: 'flex'}}>
        {columns.map(column => (
          <div style={{width: '33.333%'}}>
            {column.map((work) => (
              <li key={work.title} style={{color: work.thumbnail_kind === "big" ? "red" : "blue"}}>
                <img src={work.thumbnail} />
              </li>))}
          </div>
        ))}
      </div>
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

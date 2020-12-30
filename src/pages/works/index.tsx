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
  const columnsNumber = 4
  const itemsPerColumn = Math.floor(props.works.length / columnsNumber)
  const bigThumbnailWorks = props.works.filter(work => work.thumbnail_kind === "big")
  const smallThumbnailWorks = props.works.filter(work => work.thumbnail_kind === "small")
  const sortedWorks = props.works.sort((a, b) => {
    if (a.thumbnail_kind === "big" && b.thumbnail_kind === "big") {
      return 1
    }
    if (a.thumbnail_kind === "small" && b.thumbnail_kind === "small") {
      return 1
    }

    return 0
  })


  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <div style={{display: 'flex'}}>
        {Array(4).fill(null).map((_, columnIndex) => (
          <div style={{width: '25%'}}>
            {sortedWorks.slice(columnIndex * itemsPerColumn, columnIndex * itemsPerColumn + itemsPerColumn).map(work => (
              <li key={work.title} style={{color: work.thumbnail_kind === "big" ? "red" : "blue"}}>
                <img src={work.thumbnail} />
              </li>
            ))}
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

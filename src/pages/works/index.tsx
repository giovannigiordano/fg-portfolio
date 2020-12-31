import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import BasicMeta from '../../components/meta/BasicMeta'
import OpenGraphMeta from '../../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../components/meta/TwitterCardMeta'
import config from '../../lib/config'
import { countWorks, listWorkContent, WorkContent } from '../../lib/works'
import Head from 'next/head'
import WorkList from '../../components/Work/List'

type Props = {
  works: WorkContent[]
}

const Works: React.FC<Props> = (props) => {
  const url = '/works'
  const title = 'All works'

  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />

      <div className="flex items-center">
        <div>
          <h1
            className="flex flex-col ml-20 mr-32 text-6xl text-gray-600 uppercase"
            style={{ width: 450 }}
          >
            <span className="font-semibold ">Francesco</span>
            <span className="self-end font-semibold ">Giordano</span>
            <span className="font-light">Architect</span>
          </h1>
        </div>

        <WorkList items={props.works} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const works = listWorkContent(1)
  return {
    props: {
      works,
    },
  }
}

export default Works

import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import BasicMeta from '../../components/meta/BasicMeta'
import OpenGraphMeta from '../../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../components/meta/TwitterCardMeta'
import config from '../../lib/config'
import { countWorks, listWorkContent, WorkContent } from '../../lib/works'
import Head from 'next/head'
import WorkList from '../../components/Work/List'
import { useLayoutEffect, useState } from 'react'
import { useDevice } from '../../contexts/device'
import makeDeviceClassName from '../../lib/makeDeviceClassName'

type Props = {
  works: WorkContent[]
}

const Works: React.FC<Props> = (props) => {
  const url = '/works'
  const title = 'All works'
  const device = useDevice()

  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />

      <div
        className={makeDeviceClassName(
          'flex items-center',
          'flex-col',
          'flex-row pl-32 pt-10',
          device.value
        )}
      >
        <div>
          <h1
            className={makeDeviceClassName(
              'flex flex-col uppercase fixed left-4 top-4 z-10',
              'text-3xl mt-5 mb-10',
              'text-6xl',
              device.value
            )}
            style={{ width: device.value === 'desktop' ? 450 : 250 }}
          >
            <span className="font-bold ">Francesco</span>
            <span className="self-end font-bold ">Giordano</span>
            <span className="font-bold">Architect</span>
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

import {BlogPosting} from "schema-dts";
import {jsonLdScriptProps} from "react-schemaorg";
import config from "../../lib/config";
import {formatISO} from "date-fns";
import Head from "next/head";

type Props = {
  url: string;
  title: string;
  date: Date;
  author?: string;
  image?: string;
  description?: string;
};

const JsonLdMeta: React.FC<Props> = (props) => (
  <Head>
    <script
      {...jsonLdScriptProps<BlogPosting>({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: config.base_url + props.url,
        headline: props.title,
        datePublished: formatISO(props.date),
        author: props.author,
        image: props.image,
        description: props.description,
      })}
    />
  </Head>
);

export default JsonLdMeta

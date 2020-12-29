import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const worksDirectory = path.join(process.cwd(), "src/pages/works");

export type WorkContent = {
  readonly date: string;
  readonly slug: string;
  readonly thumbnail: string;
  readonly title: string;
};

let workCache: WorkContent[];

function fetchPostContent(): WorkContent[] {
  if (workCache) {
    return workCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(worksDirectory);
  const allWorksData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(worksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, {schema: yaml.JSON_SCHEMA}) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        slug: string;
        thumbnail: string;
        title: string;
      };
      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  // Sort posts by date
  workCache = allWorksData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return workCache;
}

export function countWorks(): number {
  return fetchPostContent().length;
}

export function listWorkContent(
  page: number,
): WorkContent[] {
  return fetchPostContent()
}

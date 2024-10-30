import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { Heading, Text, Pre, Code, Tweet } from "../components";

const components = {
  img: Image,
  h1: Heading.H1,
  h2: Heading.H2,
  p: Text,
  code: Pre,
  inlineCode: Code,
};

export default function Post({ mdxSource, tweets }) {
  const StaticTweet = ({ id }) => {
    // Use the tweets map that is present in the outer scope to get the content associated with the id passed as prop
    return <Tweet tweet={tweets[id]} />;
  };

  return (
    <MDXRemote
      {...mdxSource}
      components={{
        // Append the newly defined StaticTweet component to the list of predefined MDX components
        ...components,
        StaticTweet,
      }}
    />
  );
}

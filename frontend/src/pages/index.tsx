import * as React from "react";
import { navigate, type HeadFC, type PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  navigate("/app/pokedex");
  return <main></main>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

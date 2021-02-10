// @packages
import React from "react";
import { graphql, Link } from "gatsby";

// @scripts
import styles from '../scss/pages/blogs.module.scss';

const BlogEntry = ({ title, slug, authors = [] }) => (
  <div className={styles.blogEntry}>
    <Link to={`/blog/${slug}`}>
      <h3>{title}</h3>
    </Link>
    <ul>
      {authors.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  </div>
);

const BlogsPage = ({ data }) => {
  const blogs = data.allContentfulBlog.edges.map(({ node }) => ({
    ...node,
    description: node.description.description,
  }));

  return (
    <div>
      {blogs.map((blog, index) => (
        <BlogEntry
          key={`entry-${index}`}
          title={blog.title}
          slug={blog.slug}
          authors={blog.authors}
        />
      ))}
    </div>
  );
};

export const query = graphql`
  query getBlogPosts {
    allContentfulBlog(limit: 10) {
      totalCount
      edges {
        node {
          title
          slug
          description {
            description
          }
          createdAt
          authors {
            name
          }
        }
      }
    }
  }
`;

export default BlogsPage;

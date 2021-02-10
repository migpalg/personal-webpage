// @packages
import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

// @scripts
import styles from "../scss/templates/blog-post.module.scss";
import { rhythm } from "../utils/typography";

/**
 * Common template for blog posts
 */
const BlogPost = ({ data }) => {
  const content = data.contentfulBlog;

  return (
    <div className="container">
      <h1>{content.title}</h1>
      <ul className={styles.vList}>
        {content.authors.map((author) => (
          <li key={author.twitter}>
            <Img className={styles.blogHeroImg} fixed={author.photo.fixed} />
            <p>
              <strong>{author.name}</strong>
            </p>
            <p>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://github.com/${author.github}`}
              >
                Github
              </a>
            </p>
            <p>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://twitter.com/${author.twitter}`}
              >
                Twitter
              </a>
            </p>
          </li>
        ))}
      </ul>
      <p>
        <small>{new Date(content.createdAt).toLocaleString()}</small>
      </p>
      <Img
        className={styles.blogHeroImg}
        style={{ marginBottom: rhythm(1 + 1 / 2) }}
        fluid={content.hero.fluid}
      />
      <ul className={styles.vList}>
        {content.categories.map(({ name, color }) => (
          <li
            className={styles.vCategory}
            key={`cat-${name}`}
            style={{ backgroundColor: color }}
          >
            {name}
          </li>
        ))}
      </ul>
      <div
        className={styles.blogPost}
        dangerouslySetInnerHTML={{
          __html: content.blogContent.childMarkdownRemark.html,
        }}
      ></div>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      title
      hero {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
      description {
        description
      }
      blogContent {
        childMarkdownRemark {
          html
        }
      }
      createdAt
      categories {
        name
        color
      }
      authors {
        name
        twitter
        github
        photo {
          fixed(width: 40, height: 40) {
            ...GatsbyContentfulFixed
          }
        }
      }
    }
  }
`;

export default BlogPost;

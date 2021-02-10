const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogsResult = await graphql(`
    query allBlogs {
      allContentfulBlog {
        nodes {
          slug
        }
      }
    }
  `);

  blogsResult.data.allContentfulBlog.nodes.forEach((node) => {
    createPage({
      path: `/blog/${node.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.slug
      }
    });
  });
};

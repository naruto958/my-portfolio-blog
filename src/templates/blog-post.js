import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { createGlobalStyle } from 'styled-components';
import Layout from '../containers/Layout';
import { PageTitle } from '../components/shared/Text';
import Prism from 'prismjs';

class BlogPost extends React.Component {
  componentDidMount() {
    if (typeof window.twttr.widgets !== 'undefined') {
      window.twttr.widgets.load();
    }
  }

  render() {
    const post = this.props.data.wordpressPost;

    return (
      <Layout>
        <Helmet
          title={`${post.title} | Souleymane`}
          meta={[
            {
              name: 'description',
              content: `Check out this post ${post.title} by Souleymane Dembele.`,
            },
            {
              property: 'og:title',
              content: `${post.title} | Souleymane Dembele`,
            },
            {
              property: 'og:url',
              content: `https://souleymanedembele.com/blog/${post.slug}`,
            },
          ]}
        />
        <GlobalStyle />
        <PageTitle blogPost>{post.title}</PageTitle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0',
          }}
        >
          <a
            className="twitter-share-button"
            style={{ marginBottom: 0 }}
            href="https://twitter.com/intent/tweet"
            data-size="large"
            data-text={`${post.title}`}
            data-url={`https://souleymanedembele.com/blog/${post.slug}`}
            data-hashtags="EpicSociety,NarutoDev,Souleymane"
            data-via="souleymane"
            data-related="coding,react,javascript"
          >
            Tweet
          </a>
        </div>
        {post.featured_media.source_url && (
          <img
            className="featured__image"
            alt={post.title}
            src={
              post.featured_media.source_url
                ? post.featured_media.source_url
                : ''
            }
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </Layout>
    );
  }
}

export default BlogPost;

export const query = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      content
      title
      slug
      featured_media {
        source_url
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  code {
    display: block;
  }

  img {
    display: block;
    margin: 10px auto;
  }

  .featured__image{
    width: 20rem;
  }
`;

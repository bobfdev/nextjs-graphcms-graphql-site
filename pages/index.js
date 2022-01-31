import { gql } from '@apollo/client';
import Head from 'next/head';
import client from '../apolloClient';

export default function Home({ nextjsProjects }) {
  console.log(nextjsProjects);
  return (
    <div>
      <Head>
        <title>Nextjs Application</title>
        <meta name="description" content="Nextjs Webinar App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Learning Nextjs</h1>
      <ul>
        {nextjsProjects.map((nextjsProject, i) => 
          <li key={i}>
            <a href={nextjsProject.slug}>{nextjsProject.title}</a>
          </li>
        )}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const {data} = await client.query({
    query: gql`
      query {
        nextjsProjects {
          title
          slug
          dateAndTime
          coverImage {
            url
          }
          guestName
          description {
            raw
          }
        }
      }
    `
  })
  const {nextjsProjects} = data;
    return {
      props: {
        nextjsProjects
      }
    }
}

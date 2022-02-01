import { gql } from '@apollo/client';
// import Image from 'next/image';
import client from '../../apolloClient';

export default function ProjectPage({ nextjsProject }) {
  return (
    <div>
        <h1>{nextjsProject.title}</h1>
        {/* <Image src={nextjsProject.coverImage.url} alt={`${nextjsProject.title} Cover Image`} /> */}
        <img src={nextjsProject.coverImage.url} alt={`${nextjsProject.title} Cover Image`} />
        <div dangerouslySetInnerHTML={{__html:nextjsProject.description.html}} />
    </div>
  );
}

export async function getStaticPaths() {
    const {data} = await client.query({
        query: gql`
          query {
            nextjsProjects {
              title
              slug
            }
          }
        `
      })
      const {nextjsProjects} = data;
      const paths = nextjsProjects.map(nextjsProject => ({
          params: {slug: [nextjsProject.slug]}
      }))
      console.log(paths)
      return {paths, fallback: false};
}

export async function getStaticProps({params}) {
    const slug = params.slug[0];
    const {data} = await client.query({
        query: gql`
            # ! = required
          query nextjsProjectBySlug ($slug: String!) {
            nextjsProjects (where: { slug : $slug}) {
              title
              slug
              dateAndTime
              coverImage {
                url
              }
              guestName
              description {
                raw
                html
              }
            }
          }
        `,
        variables: {slug}
      })
      const {nextjsProjects} = data;
      const nextjsProject = nextjsProjects[0];
      console.log(nextjsProject);
      return { props: {nextjsProject}}
}
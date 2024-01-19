// Import necessary modules and components
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

// Main component for the index page
export default function Index({ posts, globalData }) {
  return (
    <Layout>
      {/* SEO and header components */}
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />

      {/* Main content */}
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>

        {/* Skills Section */}
        <section className="my-8">
          <h2 className="text-3xl lg:text-4xl text-center mb-4 font-bold">
            Skills
          </h2>
          <div className="flex flex-col items-center">
            <SkillCategory title="Frontend Technologies" skills={['HTML', 'CSS', 'JavaScript', 'React.js']} />
            <SkillCategory title="Backend Technologies" skills={['Node.js', 'Python (Django, Flask)']} />
            <SkillCategory title="Database" skills={['MySQL']} />
            <SkillCategory title="Version Control" skills={['Git', 'GitHub']} />
            <SkillCategory title="Tools" skills={['Visual Studio Code', 'Postman']} />
          </div>
        </section>

        {/* List of posts */}
        <ul className="w-full">
          {posts.map((post) => (
            // Post item
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              {/* Link to individual post */}
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                {/* Post content */}
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">projects</h2>
                  {post.data.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer and background components */}
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

// SkillBadge Component
const SkillBadge = ({ name }) => (
  <div className="m-2 py-2 px-4 bg-gray-800 text-white rounded-full text-sm">
    {name}
  </div>
);

// SkillCategory Component
const SkillCategory = ({ title, skills }) => (
  <div className="mb-4">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex flex-wrap">
      {skills.map((skill, index) => (
        <SkillBadge key={index} name={skill} />
      ))}
    </div>
  </div>
);

// Fetch static props for the page
export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}

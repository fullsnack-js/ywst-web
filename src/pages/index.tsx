import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import tw from 'twin.macro';
import styles from '../styles/Home.module.css';
import NextLink from 'next/link';
const Header = tw.header`w-full fixed top-0 border-b-2 border-b-black`;
const Container = tw.div`w-full flex px-1 py-2`;
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header tw="bg-bg text-fg flex justify-end z-10">
        <Container>
          <NextLink href="/">
            <a>HOME</a>
          </NextLink>
        </Container>
        <Container
          tw="justify-between"
          css={`
            a {
              ${tw`flex`}
            }
          `}
        >
          <NextLink href="/">
            <a>ABOUT</a>
          </NextLink>
          <NextLink href="/">
            <a>CLASSES</a>
          </NextLink>
          <NextLink href="/">
            <a>CONTACT</a>
          </NextLink>
        </Container>
      </Header>
      <div className={styles.container} tw="bg-bg">
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;

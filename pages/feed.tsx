import Link from "next/link";
import Head from "next/head";
import Footer from "../components/footer";
import { useState } from "react";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";
import PostFeed from "../components/PostFeed";

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

// CHANGE IMAGE META ONCE PAGE DONE
export default function Feed(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Head>
        <title>GetMe.Pizza | Feed</title>
        <meta name='title' content='GetMe.Pizza | Feed' />
        <meta
          name='description'
          content='View the latest feed of all the public posts on GetMe.Pizza '
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://getme.pizza/' />
        <meta property='og:title' content='GetMe.Pizza | Feed' />
        <meta
          property='og:description'
          content='View the latest feed of all the public posts on GetMe.Pizza '
        />
        <meta property='og:image' content='https://i.imgur.com/nFZLBWm.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://getme.pizza/' />
        <meta property='twitter:title' content='GetMe.Pizza | Feed' />
        <meta
          property='twitter:description'
          content='View the latest feed of all the public posts on GetMe.Pizza '
        />
        <meta
          property='twitter:image'
          content='https://i.imgur.com/nFZLBWm.png'
        />

        <link rel='icon' href='https://i.imgur.com/FO1GnPi.jpg' />
      </Head>
      <main className='min-h-[calc(100vh-163px)] max-w-2xl mx-auto flex flex-col justify-between'>
        <PostFeed posts={posts} admin={false} />
        <div className='text-center mx-auto w-[250px]'>
          <button
            disabled={postsEnd || loading}
            className=' font-CircularMedium bg-yellow-300 disabled:bg-gray-300 disabled:hover:scale-100 rounded-full mt-6 py-3 min-w-full text-center md:max-w-xs md:mx-auto dark:text-black hover:scale-105 transition-all'
            onClick={getMorePosts}
          >
            {postsEnd ? (
              `No more posts`
            ) : !loading ? (
              `Load more`
            ) : (
              <>
                <div role='status'>
                  <svg
                    className='inline mb-1 mr-4 w-6 h-6 text-gray-200 animate-spin dark:text-gray-300 fill-yellow-400'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className=''>Loading...</span>
                </div>
              </>
            )}
          </button>
        </div>
        <Footer />
      </main>
    </>
  );
}
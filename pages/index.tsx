import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import ElonsDev from '../public/elonsdev.png'
import NavBar from './components/navbar';
import Footer from './components/footer';
import { firestore, postToJSON, userToJson } from './libs/firebase';
import UsersFeed from './components/UsersList';

const LIMIT = 10;

export async function getServerSideProps(context) {
  const usersQuery = firestore.collection('users').limit(LIMIT);
  const users = (await usersQuery.get()).docs.map(userToJson);
  return {
    props: {users},
  }
}

export default function Home(props) {
  console.log(props)
  return (
    <div className='bg-slate-50'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='  font-CircularMedium lg:max-w-5xl lg:mx-auto'>
        <NavBar/>

        <section className='px-3 md:px-20'>
          <div>
            <h1 className='text-3xl font-bold text-center px-2 py-2 leading-10 md:text-4xl md:max-w-lg mx-auto lg:max-w-4xl lg:text-6xl lg:pt-14 '>We can all use a slice of 🍕 sometimes...</h1>
            <p className='pt-8 px-2 py-8 max-w-sm mx-auto text-center text-gray-800 font-Montserrat font-bold leading-7 text-lg md:text-xl md:max-w-md lg:max-w-4xl lg:text-2xl lg:px-40'>It all started with the pizza, so get tipped the crypto way... with pizza of course.</p>
            <div className='mx-2 text-center py-4 rounded-full bg-white mb-4 text-lg lg:max-w-lg lg:mx-auto'>
              <span>
                getme.pizza/
              </span>
              <input placeholder={"yourname"}></input>
              <span className='hidden px-6 bg-yellow-400 rounded-full text-lg  py-3 text-center lg:inline'><Link href='/enter'>Start my page</Link></span>
              
            </div>
            
            
            <Link href='/enter'><div className='mx-2 bg-yellow-400 rounded-full text-lg  py-3 text-center lg:hidden'>Start my page</div></Link>
            <p className=' px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-sm'>*It's free and takes only a minute.</p>
          </div>
        </section>

        <section className='px-3 md:px-20'>
          <h1>LATEST CREATORS</h1>
          
          
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide snap-x scroll-auto'>
              <UsersFeed users={props}/>
            </ul>
          </nav>
          
        </section>

        <section className='bg-yellow-50 pb-10 rounded-3xl '>
          <div className='px-3 md:px-20'>
            <h4 className='text-center pt-10 text-gray-500 pb-5 tracking-wide' >TIP</h4>
            <h2 className='text-3xl font-bold text-center px-2 leading-10 pb-5'>Give your followers a way to say wagmi.</h2>
            <p className='pt-8 px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-lg'>GetMe.Pizza makes supporting pretty awesome. With just a click, your followers can tip you enough crypto to get yourself a 🍕 slice! They can leave a message and not even have to create an account.</p>
          </div>

          <div className='px-3 md:px-20'>
            <h4 className='text-center pt-10 text-gray-500 pb-5 tracking-wide' >COMING SOON...</h4>
            <h2 className='text-3xl font-bold text-center px-2 leading-10 pb-5'>We are building.</h2>
            <p className='pt-8 px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-lg'>Membership tools and ways to sell your digital items easily are coming next...</p>
          </div>
          
        </section>

        <section className='pt-10 mb-5'>
          <h2 className='text-3xl font-bold text-center px-2 leading-10 py-5'>Made for web3 creators</h2>
          <div className='pt-8'>
            <svg className='mx-auto mb-6' width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="41"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.136719H41.3108V40.1112H0V0.136719Z" fill="white"></path></mask><g mask="url(#mask0)"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7003 37.2848C9.68713 36.2559 5.8739 34.101 3.64586 30.5039C1.38421 26.8525 1.04811 22.2976 2.08109 18.1903C3.00727 14.5116 4.90389 11.5593 7.38805 9.18777C14.9707 6.44267 23.3778 4.43245 30.8618 8.19926C38.8737 12.2316 41.928 22.5256 37.2349 30.1963C32.4474 38.021 21.9816 39.4078 13.7003 37.2848ZM36.2487 9.85884C29.2778 2.89884 19.5313 3.74139 10.7592 6.52309C14.7507 3.90309 19.5569 2.27075 24.2095 1.27203C24.8328 1.13841 24.7073 0.0647962 24.0568 0.140541C17.6798 0.884796 11.0953 3.54309 6.42221 8.06735C5.17269 8.55756 3.95677 9.0682 2.79191 9.58139C2.13631 9.87033 2.60897 11.0167 3.28457 10.7503C3.65045 10.6065 4.02016 10.4618 4.39157 10.3171C3.18885 11.8418 2.18268 13.5303 1.43603 15.3856C-2.13683 24.2703 1.03612 34.1456 10.0751 37.9818C18.3737 41.5039 30.304 40.9669 36.6979 34.0269C42.9864 27.201 42.8541 16.4546 36.2487 9.85884Z" fill="#FFD200"></path><path d="M21.5252 30.5161L21.6164 30.5041C21.8929 30.4426 22.0312 30.2583 22.0312 29.9511C21.8468 26.9713 21.7777 23.9838 21.8238 20.9886C21.8699 17.9934 22.2001 14.9905 22.8145 11.9799C22.8145 11.7956 22.7608 11.5959 22.6532 11.3809C22.5457 11.1658 22.3998 10.9662 22.2155 10.7818C22.0312 10.5975 21.8161 10.4439 21.5704 10.321C21.3246 10.1982 21.0942 10.1367 20.8792 10.1367C20.6948 10.1367 20.5105 10.3978 20.3262 10.9201C20.1419 11.4423 19.9729 12.026 19.8193 12.6711C18.9899 17.402 18.7902 22.2404 19.2203 27.1863C19.2203 27.4014 19.3432 27.8391 19.5889 28.4996C19.8347 29.1601 20.234 29.7207 20.787 30.1815C20.9099 30.2737 21.0404 30.3582 21.1787 30.435C21.3169 30.5118 21.4628 30.5348 21.6164 30.5041L21.5252 30.5161Z" fill="#161408"></path></g></svg>
            <p className='mx-auto text-center max-w-[250px] font-Montserrat text-sm'>Set up your account and allow your <span className='font-CircularMedium  '>fans</span> to support <span className='font-CircularMedium  '>you</span>.</p>
          </div>
          <div className='pt-8'>
            <svg className='mx-auto mb-6' width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="41"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.136719H41.3108V40.1112H0V0.136719Z" fill="white"></path></mask><g mask="url(#mask0)"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7003 37.2848C9.68713 36.2559 5.8739 34.101 3.64586 30.5039C1.38421 26.8525 1.04811 22.2976 2.08109 18.1903C3.00727 14.5116 4.90389 11.5593 7.38805 9.18777C14.9707 6.44267 23.3778 4.43245 30.8618 8.19926C38.8737 12.2316 41.928 22.5256 37.2349 30.1963C32.4474 38.021 21.9816 39.4078 13.7003 37.2848ZM36.2487 9.85884C29.2778 2.89884 19.5313 3.74139 10.7592 6.52309C14.7507 3.90309 19.5569 2.27075 24.2095 1.27203C24.8328 1.13841 24.7073 0.0647962 24.0568 0.140541C17.6798 0.884796 11.0953 3.54309 6.42221 8.06735C5.17269 8.55756 3.95677 9.0682 2.79191 9.58139C2.13631 9.87033 2.60897 11.0167 3.28457 10.7503C3.65045 10.6065 4.02016 10.4618 4.39157 10.3171C3.18885 11.8418 2.18268 13.5303 1.43603 15.3856C-2.13683 24.2703 1.03612 34.1456 10.0751 37.9818C18.3737 41.5039 30.304 40.9669 36.6979 34.0269C42.9864 27.201 42.8541 16.4546 36.2487 9.85884Z" fill="#FFD200"></path><path d="M21.5252 30.5161L21.6164 30.5041C21.8929 30.4426 22.0312 30.2583 22.0312 29.9511C21.8468 26.9713 21.7777 23.9838 21.8238 20.9886C21.8699 17.9934 22.2001 14.9905 22.8145 11.9799C22.8145 11.7956 22.7608 11.5959 22.6532 11.3809C22.5457 11.1658 22.3998 10.9662 22.2155 10.7818C22.0312 10.5975 21.8161 10.4439 21.5704 10.321C21.3246 10.1982 21.0942 10.1367 20.8792 10.1367C20.6948 10.1367 20.5105 10.3978 20.3262 10.9201C20.1419 11.4423 19.9729 12.026 19.8193 12.6711C18.9899 17.402 18.7902 22.2404 19.2203 27.1863C19.2203 27.4014 19.3432 27.8391 19.5889 28.4996C19.8347 29.1601 20.234 29.7207 20.787 30.1815C20.9099 30.2737 21.0404 30.3582 21.1787 30.435C21.3169 30.5118 21.4628 30.5348 21.6164 30.5041L21.5252 30.5161Z" fill="#161408"></path></g></svg>
            <p className='mx-auto text-center max-w-[250px] font-Montserrat text-sm'>You will get your crypto paid out <span className='font-CircularMedium  '>instantly</span>, while your supporter will get an NFT as a momento.</p>
          </div>
          <div className='pt-8 pb-10'>
            <svg className='mx-auto mb-6' width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="41"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.136719H41.3108V40.1112H0V0.136719Z" fill="white"></path></mask><g mask="url(#mask0)"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7003 37.2848C9.68713 36.2559 5.8739 34.101 3.64586 30.5039C1.38421 26.8525 1.04811 22.2976 2.08109 18.1903C3.00727 14.5116 4.90389 11.5593 7.38805 9.18777C14.9707 6.44267 23.3778 4.43245 30.8618 8.19926C38.8737 12.2316 41.928 22.5256 37.2349 30.1963C32.4474 38.021 21.9816 39.4078 13.7003 37.2848ZM36.2487 9.85884C29.2778 2.89884 19.5313 3.74139 10.7592 6.52309C14.7507 3.90309 19.5569 2.27075 24.2095 1.27203C24.8328 1.13841 24.7073 0.0647962 24.0568 0.140541C17.6798 0.884796 11.0953 3.54309 6.42221 8.06735C5.17269 8.55756 3.95677 9.0682 2.79191 9.58139C2.13631 9.87033 2.60897 11.0167 3.28457 10.7503C3.65045 10.6065 4.02016 10.4618 4.39157 10.3171C3.18885 11.8418 2.18268 13.5303 1.43603 15.3856C-2.13683 24.2703 1.03612 34.1456 10.0751 37.9818C18.3737 41.5039 30.304 40.9669 36.6979 34.0269C42.9864 27.201 42.8541 16.4546 36.2487 9.85884Z" fill="#FFD200"></path><path d="M21.5252 30.5161L21.6164 30.5041C21.8929 30.4426 22.0312 30.2583 22.0312 29.9511C21.8468 26.9713 21.7777 23.9838 21.8238 20.9886C21.8699 17.9934 22.2001 14.9905 22.8145 11.9799C22.8145 11.7956 22.7608 11.5959 22.6532 11.3809C22.5457 11.1658 22.3998 10.9662 22.2155 10.7818C22.0312 10.5975 21.8161 10.4439 21.5704 10.321C21.3246 10.1982 21.0942 10.1367 20.8792 10.1367C20.6948 10.1367 20.5105 10.3978 20.3262 10.9201C20.1419 11.4423 19.9729 12.026 19.8193 12.6711C18.9899 17.402 18.7902 22.2404 19.2203 27.1863C19.2203 27.4014 19.3432 27.8391 19.5889 28.4996C19.8347 29.1601 20.234 29.7207 20.787 30.1815C20.9099 30.2737 21.0404 30.3582 21.1787 30.435C21.3169 30.5118 21.4628 30.5348 21.6164 30.5041L21.5252 30.5161Z" fill="#161408"></path></g></svg>
            <p className=' mx-auto text-center max-w-[250px] font-Montserrat text-sm'>Tips and memo's are <span className='font-CircularMedium  '>transparent</span> and <span className='font-CircularMedium  '>on-chain</span>.</p>
          </div>
          <Link href='/enter'><div className='mx-10 bg-yellow-400 rounded-full  py-2 text-center md:max-w-xs md:mx-auto'>Start my page</div></Link>
            <p className=' px-2 py-2 text-center text-gray-800 font-Montserrat font-bold leading-7 text-xs'>*It's free and takes only a minute.</p>
        </section>

       <Footer/>
      </main>

      
    </div>
  )
}

import Hero from "@/components/home/hero/Hero";
import Destination from "@/components/home/destination/Destination";
import Offer from "@/components/home/offer/Offer";
import Main from "@/layouts/Main";
import BestSelling from "@/components/home/bestSelling/BestSelling";
import Advantage from "@/components/home/advantage/Advantage";
import PopularDestination from "@/components/home/popular-destination/PopularDestination";
import Head from "next/head";
import Steps from "@/components/home/steps/Steps";
import Blogs from "@/components/home/blogs/Blogs";
import Reviews from "@/components/shared/review/Reviews";
import Gallery from "@/components/home/gallery/Gallery";
import NewsLetter from "@/components/home/news-letter/NewsLetter";

export default function Home() {
  return (
    <main>
      <Head>
        <title>
          Wassado is a multifaceted hospitality establishment designed to cater
          to diverse traveler preferences while championing eco-friendly
          practices and cultural immersion. The centerpiece of Wassado's
          offerings is its 17 unique bungalows, each with its own character and
          charm, providing accommodation for up to 46 guests. Additionally, a
          campground with space for 54 guests offers an alternative lodging
          option for adventurous travelers.
        </title>
      </Head>
      <Main>
        <Hero />
        <Offer />
        <BestSelling />
        <Advantage />
        <Reviews />
        <Gallery />
      </Main>
    </main>
  );
}

/**
 * Using CORS in Next.js to handle cross-origin requests
 * https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
 */

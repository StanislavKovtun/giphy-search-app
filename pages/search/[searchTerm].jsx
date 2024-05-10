import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

const GIPHY_KEY = "iydOb0v8bvpqj2cHU01dkRKjZMihahUn";

export default function Search(initialData) {
	const router = useRouter()
	//console.log("### router:", router);
	//console.log("### initalData:", initialData);
	return (
		<>
			<Head>
				<title>Search</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />
			</Head>
			<p>Go <Link href="/">home</Link></p>
			{/*<p><Link href="/search/cats">View some cat giphys</Link></p>*/}
			<h1>Search results for: {router.query.searchTerm}</h1>

			<div className="giphy-search-results-grid">
				{initialData.giphys.map((each, index) => {
					return (
						<div key={index}>
							<h3>{each.title}</h3>
							<img src={each.images.original.url} alt={each.title} />
						</div>
					)
				})}
			</div>
			<Footer />
		</>
	)
}

//Get access to the route parameters in getServerSideProps
//T to get access to them in the getServerSideProps you will pass context to getServerSideProps.
// Then, inside the function, you can access the parameter defined as searchTerm like this: context.query.searchTerm.

export async function getServerSideProps(context) {
	const searchTerm = context.query.searchTerm;
	//console.log('### searchTerm:', searchTerm);

	let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${GIPHY_KEY}&limit=6`);
	giphys = await giphys.json();
	return { props: { giphys: giphys.data } }
}

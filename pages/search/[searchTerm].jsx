import Head from 'next/head'
import { useRouter } from 'next/router'

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

import Head from 'next/head'
import { useEffect } from 'react'

const GIPHY_KEY = "iydOb0v8bvpqj2cHU01dkRKjZMihahUn";

export default function Home(initialData) {
	useEffect(() => {
		//console.log("### initialData:", initialData);
	})

	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />
			</Head>

			<h1>Giphy Search App</h1>

			<div class="giphy-search-results-grid">
				{initialData.catGiphys.data.map((each, index) => {
					return (
						<div key={index}>
							<h3>{each.title}</h3>
							<img src={each.images.original.url} alt={each.title} />
						</div>
					)
				})}
			</div>

		</div>
	)
}

export async function getStaticProps() {
	let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${GIPHY_KEY}&limit=10`);
	console.log("### catGiphys:", catGiphys);
	catGiphys = await catGiphys.json();
	return {
		props: {
			catGiphys: catGiphys,
			testProp: 'test'
		}
	}
}

import Head from 'next/head'
import { useEffect } from 'react'

const GIPHY_KEY = "iydOb0v8bvpqj2cHU01dkRKjZMihahUn";

export default function Home(initialData) {
	useEffect(() => {
		console.log(initialData);
	})

	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />
			</Head>

			<h1>Giphy Search App</h1>
		</div>
	)
}

export async function getStaticProps() {
	let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${GIPHY_KEY}&limit=10`)
	catGiphys = await catGiphys.json()
	return { props: { catGiphys: catGiphys } }
}
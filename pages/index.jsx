import Head from 'next/head'
import { useEffect, useState } from 'react'

const GIPHY_KEY = "iydOb0v8bvpqj2cHU01dkRKjZMihahUn";

export default function Home(initialData) {
	const [formInputs, setFormInputs] = useState({})

	useEffect(() => {
		console.log(initialData);
	}, [])

	const handleInputs = (event) => {
		let { name, value } = event.target
		setFormInputs({ ...formInputs, [name]: value });
		//console.log({ ...formInputs, [name]: value });
	}

	const search = (event) => {
		event.preventDefault()
		console.log("### event:", event);
		console.log("### name:", event.target.name);
		console.log(formInputs.searchTerm);
		//console.log(event.target.searchTerm.value);
	}

	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />
			</Head>

			<h1>Giphy Search App</h1>

			<form onSubmit={search} type="text" required>
				<input name="searchTerm" onChange={handleInputs} type="text" />
				<button>Search</button>
			</form>

			<div className="giphy-search-results-grid">
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

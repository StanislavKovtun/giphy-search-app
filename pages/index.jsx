import Head from 'next/head';
import { useEffect, useState } from 'react';

const GIPHY_KEY = "iydOb0v8bvpqj2cHU01dkRKjZMihahUn";
const INIT_SEARCH_TERM = "cats";

export default function Home(initialData) {
	const [formInputs, setFormInputs] = useState({});
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState(INIT_SEARCH_TERM);

	useEffect(() => {
		setSearchResults(initialData.catGiphys.data);
	}, [initialData]);

	const handleInputs = (event) => {
		let { name, value } = event.target
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};

	const search = async (event) => {
		event.preventDefault()
		//console.log("### event:", event);
		setSearchTerm(formInputs.searchTerm);
		updateData();
	}

	const updateData = async () => {
		const catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${GIPHY_KEY}&limit=10`);
		const data = await catGiphys.json();
		//console.log("### data:", data);
		setSearchResults(data.data);
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

			<h1>Search results for: {searchTerm}</h1>

			<div className="giphy-search-results-grid">
				{searchResults.map((each, index) => {
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
	let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${INIT_SEARCH_TERM}&api_key=${GIPHY_KEY}&limit=10`);
	catGiphys = await catGiphys.json();
	return {
		props: {
			catGiphys: catGiphys,
			testProp: 'test'
		}
	}
}

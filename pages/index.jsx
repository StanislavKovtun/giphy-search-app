import Head from 'next/head';
import Link from 'next/link';
import Image from "next/image";
//import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

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
		const { name, value } = event.target
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
		<>
			<div className='container'>
				<Head>
					<title>Giphy Search App</title>
					<meta name="description" content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"></meta>
					<link rel="icon" href="/favicon.ico" />
					<link rel="stylesheet" href="/styles.css" />
				</Head>

				<div className="logo-container">
					<Image
						fill
						//width={300}
						//height={200}
						src="/logo.png"
						alt="logo"
						unsized
						objectFit='contain'
					/>
				</div>

				<form onSubmit={search} type="text" required>
					<input name="searchTerm" onChange={handleInputs} type="text" />
					<button>Search</button>
				</form>

				<h1>Search results for: {searchTerm}</h1>

				<Link
					legacyBehavior
					href="/search/[pid]"
					as={`/search/${searchTerm}`}>
					<a>
						{`http://localhost:3000/search/${searchTerm}`}
					</a>
				</Link>

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
			<Footer />
		</>
	)
}

// 1. Statically generated page

//When HTML gets generated#
//Lastly, if you remember from a previous lesson, statically generated pages are created at build time.
//That means that when someone requests that page, the server has the HTML in hand and serves it to the user right away.
// When you are server-side rendering a page, the server creates the HTML for every request.

//export async function getStaticProps() {
//	let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${INIT_SEARCH_TERM}&api_key=${GIPHY_KEY}&limit=10`);
//	catGiphys = await catGiphys.json();
//	return {
//		props: {
//			catGiphys: catGiphys,
//			testProp: 'test'
//		}
//	}
//}

// 2. Dynamically generated page (SSR)

//When should you server-side render a page?#
//A good way to judge if server-side rendering a page is the right page type for you is to ask yourself a few questions.

//Will the data change often?
//Is the most recent data important?
//Will the page use route parameters in order to determine which data it will retrieve?
//If you answered yes to any of those questions, you will need to server-side render the page.

export async function getServerSideProps() {

	// test env vars
	const db = {
		host: process.env.DB_HOST,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
	}
	console.log("### db:", db);

	let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${INIT_SEARCH_TERM}&api_key=${GIPHY_KEY}&limit=10`);
	catGiphys = await catGiphys.json();
	return {
		props: {
			catGiphys: catGiphys,
			testProp: 'test'
		}
	}
}

//export function getStaticProps() {
//	const db = {
//		host: process.env.DB_HOST,
//		username: process.env.DB_USER,
//		password: process.env.DB_PASS,
//	}
//	console.log("### db:", db);
//}

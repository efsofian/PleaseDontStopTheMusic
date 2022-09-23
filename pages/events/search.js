import qs from "qs";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";

export default function SearchPage({ events }) {
	const router = useRouter();
	return (
		<Layout title="Search Results">
			<Link href="/events">Go Back</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>no events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} event={evt.attributes} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term },
			],
		},
		populate: {
			image: true,
		},
	});
	console.log("query", query);
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/events?filters[name][$contains]=${term}&populate=image`
	);
	const data = await res.json();

	return {
		props: {
			events: data.data,
		},
	};
}

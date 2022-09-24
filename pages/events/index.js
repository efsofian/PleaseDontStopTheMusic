import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";
import Pagination from "../../components/Pagination";
import Link from "next/link";

const PER_PAGE = 4;

export default function EventPage({ events, page, total }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>no events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} event={evt.attributes} />
			))}
			<Pagination page={page} total={total} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

	// const totalRes = await fetch(
	// 	`${process.env.NEXT_PUBLIC_API_URL}/api/events/count`
	// );
	// const total = await totalRes.json();

	const eventRes = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/events?sort=date:asc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}&pagination[withCount]=true&populate=image`
	);
	const data = await eventRes.json();
	console.log(data);

	return {
		props: {
			events: data.data,
			page: +page,
			total: data.meta.pagination.total,
		},
	};
}

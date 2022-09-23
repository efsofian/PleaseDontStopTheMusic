import Link from "next/link";
import Layout from "../components/Layout";
import EventItem from "../components/EventItem";

export default function HomePage({ events }) {
	return (
		<Layout>
			<h1>upcoming events</h1>
			{events.length === 0 && <h3>no events to show</h3>}
			{events.map((evt) => {
				return <EventItem key={evt.id} event={evt.attributes} />;
			})}

			{events.length > 0 && (
				<Link href="/events">
					<a className="btn-secondary">View All Events</a>
				</Link>
			)}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/events?sort=date:asc&pagination[pageSize]=2&populate=image`
	);
	const data = await res.json();

	return {
		props: {
			events: data.data,
			revalidate: 1,
		},
	};
}

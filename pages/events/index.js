import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";

export default function EventPage({ events }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>no events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} event={evt} />
			))}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
	const data = await res.json();

	return {
		props: {
			events: data,
			revalidate: 1,
		},
	};
}

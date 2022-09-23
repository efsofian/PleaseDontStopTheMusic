import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { events } from "../api/events/data.json";
import styles from "../../styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

const EventPage = ({ event }) => {
	const handleDelete = () => {
		console.log("delete");
	};
	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/event/edit/${event.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={handleDelete}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<span>
					{event.date} at {event.time}
				</span>
				<h1>{event.name}</h1>
				{event.image && (
					<div className={styles.image}>
						<Image
							src={event.image}
							width={960}
							height={600}
							alt="event image"
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{event.performers}</p>
				<h3>Description</h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>
				<Link href="/events">
					<a className={styles.back}>Go Back</a>
				</Link>
			</div>
		</Layout>
	);
};

export async function getStaticProps(context) {
	const {
		params: { slug },
	} = context;
	const event = events.find((evt) => evt.slug === slug);
	return {
		props: {
			event,
		},

		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const paths = events.map((evt) => ({
		params: { slug: evt.slug },
	}));

	return {
		paths,
		fallback: true,
	};
}

// export async function getServerSideProps(context) {
// 	console.log(context);
// 	const { slug } = context.query;
// 	const event = events.find((evt) => evt.slug === slug);
// 	return {
// 		props: {
// 			event,
// 		},
// 	};
// }

export default EventPage;

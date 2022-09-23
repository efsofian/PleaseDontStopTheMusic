import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../components/Layout";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "../../styles/Event.module.css";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const EventPage = ({ event }) => {
	const router = useRouter();
	const handleDelete = async () => {
		if (confirm("Are you sure ?")) {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/events/${event.id}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				toast.error(data.message);
			} else {
				router.push("/events");
			}
		}
	};
	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${event.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={handleDelete}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<span>
					{new Date(event.attributes.date).toLocaleDateString("en-US")} at{" "}
					{event.attributes.time}
				</span>
				<h1>{event.attributes.name}</h1>
				<ToastContainer />
				{event.attributes.image.id && (
					<div className={styles.image}>
						<Image
							src={event.attributes.image.data.attributes.formats.medium.url}
							width={960}
							height={600}
							alt="event image"
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{event.attributes.performers}</p>
				<h3>Description</h3>
				<p>{event.attributes.description}</p>
				<h3>Venue: {event.attributes.venue}</h3>
				<p>{event.attributes.address}</p>
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
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/events?populate=image`
	);
	const data = await res.json();
	const event = data.data.find((evt) => evt.attributes.slug === slug);
	console.log("event", event);
	return {
		props: {
			event,
		},

		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/events?populate=image`
	);
	const data = await res.json();
	const paths = data.data.map((evt) => ({
		params: { slug: evt.attributes.slug },
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

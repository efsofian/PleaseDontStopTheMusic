import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";

const EdditEventPage = ({ event }) => {
	const [values, setValues] = useState({
		name: event.attributes.name,
		performers: event.attributes.performers,
		venue: event.attributes.venue,
		address: event.attributes.address,
		date: event.attributes.date,
		time: event.attributes.time,
		description: event.attributes.description,
	});
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const hasEmptyFields = Object.values(values).some((el) => el === "");
		if (hasEmptyFields) {
			console.log("please fill fields");
			toast.error("please fill fields");
		} else {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/events/${event.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ data: values }),
				}
			);
			if (!res.ok) {
				toast.error("Something went wrong");
			} else {
				const evt = await res.json();
				console.log(`${evt.data.attributes.slug}`);
				router.push(`/events/${evt.data.attributes.slug}`);
			}
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	return (
		<Layout title="Add new Event">
			<Link href="/events">Go Back</Link>
			<h1>Eddit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="performers">Performers</label>
						<input
							type="text"
							id="performers"
							name="performers"
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venues</label>
						<input
							type="text"
							id="venue"
							name="venue"
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							id="address"
							name="address"
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							id="date"
							name="date"
							value={moment(values.date).format("yyyy-MM-DD")}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							id="time"
							name="time"
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<label htmlFor="description">Event Description</label>
					<textarea
						type="text"
						id="description"
						name="description"
						value={values.description}
						onChange={handleInputChange}
					/>
				</div>
				<input type="submit" value="Update Event" className="btn" />
			</form>
		</Layout>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`
	);
	const evt = await res.json();
	return {
		props: {
			event: evt.data,
		},
	};
}

export default EdditEventPage;

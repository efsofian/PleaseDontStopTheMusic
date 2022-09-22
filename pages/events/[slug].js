import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const EventPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	return (
		<Layout>
			<div>{slug}</div>;
		</Layout>
	);
};

export default EventPage;

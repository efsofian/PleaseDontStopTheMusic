import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "../components/Layout";
import styles from "../styles/404.module.css";

const ErrorPage = () => {
	return (
		<Layout title="Page Not Found">
			<div className={styles.error}>
				<h1 className={styles.center}>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry, nothing here</h4>
				<Link href="/">Go back home</Link>
			</div>
		</Layout>
	);
};

export default ErrorPage;

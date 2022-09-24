import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../styles/AuthForm.module.css";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { register, error } = useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("passwords do not match");
			return;
		}
		register({ username, email, password });
	};
	useEffect(() => {
		error && toast.error(error);
	});
	return (
		<Layout title="User Registration">
			<div className={styles.auth}>
				<h1>Register</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="pasword">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="confirmpassword">Confirm Password</label>
						<input
							type="password"
							id="confirmpassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<input type="submit" value="Login" className="btn" />
				</form>
				<p>
					Dont have an account ? <Link href="/account/register">Register</Link>
				</p>
			</div>
		</Layout>
	);
};

export default RegisterPage;

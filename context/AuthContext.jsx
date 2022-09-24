import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();

	const register = async (userObj) => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_NEXT}/api/register`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userObj),
			}
		);
		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.message);
		}
	};
	const login = async ({ email: identifier, password }) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEXT}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ identifier, password }),
		});
		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.message);
		}
	};
	const logout = async () => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEXT}/api/logout`, {
			method: "POST",
		});
		if (res.ok) {
			setUser(null);
			router.push("/");
		}
	};
	const checkUserLoggin = async (user) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_NEXT}/api/user`);
		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setUser(null);
		}
	};
	const values = {
		user,
		error,
		register,
		login,
		logout,
	};
	useEffect(() => {
		checkUserLoggin();
	}, []);
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

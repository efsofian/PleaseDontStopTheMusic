import { useState } from "react";
import styles from "../styles/Form.module.css";

const ImageUpload = ({ evtId, imageUploaded }) => {
	const [image, setImage] = useState(null);
	console.log({ evtId });
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(); // pure javascript nothing to do with react
		formData.append("files", image);
		formData.append("ref", "api::event.event");
		formData.append("refId", evtId); //'refId' The event Id
		formData.append("field", "image"); //'field' the image field we called 'image'
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/`, {
			method: "POST",
			body: formData,
		});
		if (res.ok) {
			imageUploaded();
		} else {
			console.log(res);
		}
	};
	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};
	return (
		<div className={styles.form}>
			<h1>Upload Event Image</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>
				<input type="submit" value="Upload" className="btn" />
			</form>
		</div>
	);
};

export default ImageUpload;

import Document, { Html, Main, Head, NextScript } from "next/document"

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body className="bg-white dark:bg-black text-black dark:text-white">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument

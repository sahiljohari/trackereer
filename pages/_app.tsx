import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>JobTrack</title>
		</Head>
		<Component {...pageProps} />
	</>
);

export default MyApp;

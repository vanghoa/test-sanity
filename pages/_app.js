import '../styles/globals.css'

import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className='header'>
        <div>
          <Link legacyBehavior href="/">
            <a>Ancac</a>
          </Link>
        </div>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp

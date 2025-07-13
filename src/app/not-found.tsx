import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20">
        <h1 className="text-5xl font-bold text-coyote-600 mb-4">404</h1>
        <h2 className="text-2xl text-rich_black-500 mb-6">Page Not Found</h2>
        <p className="mb-8 text-cadet_gray-700">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="px-6 py-2 bg-cerulean-500 text-wheat-100 rounded shadow hover:bg-cerulean-700 transition">Go Home</Link>
      </main>
      <Footer />
    </>
  );
} 
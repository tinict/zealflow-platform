import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-4xl font-semibold mb-4">Not Found</h2>
      <p className="mb-8 text-lg">Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

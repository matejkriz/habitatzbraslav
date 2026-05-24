export default function FourOhFour() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-green-900">
      <div>
        <h1 className="font-truculenta text-5xl font-extrabold">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg">Oops! It seems there&apos;s nothing here.</p>
        <a className="mt-8 inline-block font-semibold underline" href="/">
          Return Home
        </a>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center -mt-32 gap-4">
      <h2 className=" text-4xl font-extrabold">Not Found</h2>
      <div className="flex flex-col items-center gap-4">
        <p className="text-base font-semibold">Invalid request</p>
        <Link
          className=" bg-orange-500 text-base font-semibold p-4 rounded-md"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

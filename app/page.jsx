import Link from "next/link";

const HomePage = () => {
  return (
    <div className="text-3xl">
      <h1>Welcome</h1>
      <Link className=" underline text-sm text-green-700" href={"./properties"}>
        {" "}
        go to properties
      </Link>
    </div>
  );
};

export default HomePage;

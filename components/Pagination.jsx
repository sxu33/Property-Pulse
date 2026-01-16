import Link from "next/link";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  console.log(typeof page, typeof pageSize, typeof totalItems);
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="mr-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;

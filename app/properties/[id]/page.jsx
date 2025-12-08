const PropertyPage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { name } = await searchParams;

  return (
    <div>
      property page {id} {name}
    </div>
  );
};

export default PropertyPage;

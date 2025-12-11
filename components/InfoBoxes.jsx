import InforBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    //   <!-- Renters and Owners -->

    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InforBox
            heading="For Renters"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            {" "}
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InforBox>
          <InforBox
            heading="For Property owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-black",
            }}
          >
            {" "}
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InforBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;

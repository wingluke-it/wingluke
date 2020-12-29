export default {
  name: "ticketType",
  title: "General Admission Ticket Type",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    },
    {
      name: "ageRange",
      title: "Age Range",
      type: "localeString",
      description:
        "Please succinctly provide the age range of who qualifies for purchasing using this ticket type (e.g. '5-12yrs' or '65 and older with ID').",
    },
  ],
  preview: {
    select: {
      name: "name.en",
      price: "price",
      ageRange: "ageRange.en",
    },
    prepare: ({ name, price, ageRange }) => {
      return {
        title: ageRange ? `${name} (${ageRange})` : name,
        subtitle: `$${price}`,
      };
    },
  },
};

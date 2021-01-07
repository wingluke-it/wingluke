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
      name: "whoQualifies",
      title: "Who Qualifies?",
      type: "localeString",
      description:
        "Please succinctly describe who qualifies for purchasing this ticket type (e.g. '5-12yrs' or 'Students with ID').",
    },
  ],
  preview: {
    select: {
      name: "name.en",
      price: "price",
      whoQualifies: "whoQualifies.en",
    },
    prepare: ({ name, price, whoQualifies }) => {
      return {
        title: whoQualifies ? `${name} (${whoQualifies})` : name,
        subtitle: price,
      };
    },
  },
};

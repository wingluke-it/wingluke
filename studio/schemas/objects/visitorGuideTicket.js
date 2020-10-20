export default {
  name: "visitorGuideTicket",
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
      name: "audience",
      title: "Audience",
      type: "localeString",
      description:
        "Please succinctly indicate who qualifies for purchasing using this ticket type (e.g. '5-12yrs' or '65 and older with ID').",
    },
  ],
  preview: {
    select: {
      name: "name.en",
      price: "price",
      audience: "audience.en",
    },
    prepare: ({ name, price, audience }) => {
      return {
        title: audience ? `${name} (${audience})` : name,
        subtitle: price,
      };
    },
  },
};

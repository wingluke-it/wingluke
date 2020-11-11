export default {
  name: "membershipLevel",
  title: "Membership Level",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "yearlyPrice",
      title: "Yearly Price",
      type: "number",
      validation: (Rule) => Rule.precision(2).positive().required(),
    },
    {
      name: "benefits",
      title: "Benefits",
      type: "localeStringArray",
      // of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      name: "name.en",
      price: "yearlyPrice",
      benefit0: "benefits.en.0",
      benefit1: "benefits.en.1",
      benefit2: "benefits.en.2",
    },
    prepare: ({ name, benefit0, benefit1, benefit2, price }) => {
      const benefits = [benefit0, benefit1, benefit2].filter(Boolean);
      const subtitle =
        benefits.length > 0
          ? `Price: $${price}; Benefits: ${benefits.join(", ")}`
          : `Price: $${price}`;
      return {
        title: name,
        subtitle: subtitle,
      };
    },
  },
};

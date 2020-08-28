export default {
  name: "organization",
  title: "Organization",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Organization Logo",
      type: "figure",
    },
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this organization.",
    },
    {
      name: "isSponsor",
      title: "Organization is a Sponsor of The Wing",
      type: "boolean",
    },
    {
      name: "donationAmount",
      title: "Amount Donated",
      type: "number",
      validation: (Rule) => Rule.positive().precision(2),
      fieldset: "sponsorDetails",
    },
    {
      // TODO necessary? maybe delete this field
      name: "staff",
      title: "Staff Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "individual" }] }],
    },
  ],
  fieldsets: [
    {
      name: "sponsorDetails",
      title: "Sponsor Details",
      options: {
        collapsible: true,
      },
    },
  ],
  validation: (Rule) => [
    Rule.custom((fields) => {
      if (fields && fields.isSponsor && !fields.donationAmount) {
        console.log(fields.donationAmount);
        return "Sponsor Details must be completely filled out because the 'Organization is a Sponsor of The Wing' toggle field is on.";
      }

      return true;
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "bio.en",
      media: "logo",
    },
  },
};

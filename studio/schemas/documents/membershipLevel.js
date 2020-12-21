import { BsBarChartFill } from "react-icons/bs";

export default {
  name: "membershipLevel",
  title: "Membership Level",
  type: "document",
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
      name: "numMemberCards",
      title: "Number of Member Cards Included",
      type: "number",
      validation: (Rule) => Rule.integer().positive().required(),
    },
    {
      name: "numChildGuests",
      title: "Child Guests",
      description: "Number of child guests admitted for free",
      type: "number",
      validation: (Rule) => Rule.integer().positive().required(),
    },
    {
      name: "numAdultGuests",
      title: "Adult Guests",
      description:
        "Number of adult guests admitted for free (not including card holders)",
      type: "number",
      validation: (Rule) => Rule.integer().positive().required(),
    },
    {
      name: "inheritsFrom",
      title: "Inherits Benefits From",
      description:
        "If this membership level includes the benefits of another membership level, reference that membership level here. Otherwise, leave blank.",
      type: "reference",
      to: [{ type: "membershipLevel" }],
      // of: [{ type: "string" }],
    },
    {
      name: "additionalBenefits",
      title: "Additional Benefits",
      description:
        "Please list additional benefits included in neither inherited benefits nor general membership benefits",
      type: "array",
      of: [{ type: "membershipBenefit" }],
      // of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      name: "name.en",
      price: "yearlyPrice",
      benefit0: "additionalBenefits.0.title.en",
      benefit1: "additionalBenefits.1.title.en",
      benefit2: "additionalBenefits.2.title.en",
    },
    prepare: ({ name, benefit0, benefit1, benefit2, price }) => {
      const benefits = [benefit0, benefit1, benefit2].filter(Boolean);
      const priceString = price ? `Price: $${price}` : "";
      const benefitsString =
        benefits.length > 0 ? `Benefits: ${benefits.join(", ")}` : "";
      const subtitle = [priceString, benefitsString].filter(Boolean).join("; ");
      return {
        title: name ? `Membership Level: ${name}` : "New Membership Level",
        subtitle: subtitle,
        media: BsBarChartFill,
      };
    },
  },
};

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
    // {
    //   name: "yearlyPrice",
    //   title: "Yearly Price",
    //   type: "number",
    //   validation: (Rule) => Rule.precision(2).positive().required(),
    // },
    {
      name: "paymentType",
      title: "Payment Type",
      type: "string",
      options: {
        list: [
          { value: "fixed", title: "Fixed Fee (to museum services)" },
          { value: "range", title: "Donation Range (to development)" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "yearlyPrice",
      title: "Yearly Price",
      description:
        'Donation Range Minimum if payment type is "Donation Range."',
      type: "number",
      validation: (Rule) => Rule.precision(2).positive().required(),
    },
    {
      name: "yearlyPriceMaximum",
      title: "Donation Range Maximum",
      type: "number",
      description:
        'This value is not used if the payment type is set to "Fixed Fee". If the payment type is "Donation Range", leave blank if there is no payment maximum (i.e. if there are no membership levels above this one).',
      validation: (Rule) => Rule.precision(2).positive(),
    },
    {
      name: "numMemberCards",
      title: "Member Cards",
      description: "Number of member cards included",
      type: "number",
      validation: (Rule) => Rule.integer().positive().required(),
      fieldset: "memberCardsAndGuests",
    },
    {
      name: "numChildGuests",
      title: "Child Guests",
      description: "Number of child guests admitted for free",
      type: "number",
      validation: (Rule) => Rule.integer().positive().required(),
      fieldset: "memberCardsAndGuests",
    },
    {
      name: "numAdultGuests",
      title: "Adult Guests",
      description:
        "Number of adult guests admitted for free (not including card holders)",
      type: "number",
      validation: (Rule) => Rule.integer().positive().required(),
      fieldset: "memberCardsAndGuests",
    },
    {
      name: "numCardsDonated",
      title: "Member Cards Donated",
      description:
        "Number of member cards donated (e.g. 2 for community memberships)",
      type: "number",
      validation: (Rule) => Rule.integer().positive(),
      fieldset: "memberCardsAndGuests",
    },
    {
      name: "narmIncluded",
      title: "NARM Included",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      fieldset: "memberCardsAndGuests",
    },
    {
      name: "featuredBenefits",
      title: "Benefits",
      description: "Provide all benefits for this membership level",
      type: "array",
      of: [{ type: "membershipBenefit" }],
      // validation: (Rule) => Rule.max(3),
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
      name: "tagline",
      title: "Tagline",
      description:
        'Give a short tagline for this membership level, e.g. "Best value"',
      type: "localeString",
    },
    /* { // these aren't needed, for now
      name: "overview",
      title: "Overview",
      type: "localePortableText",
      description: "Please provide an overview of this membership level.",
    },
    {
      name: "additionalBenefits",
      title: "Additional Benefits",
      description:
        "Please list additional benefits included in neither featured, inherited, nor core membership benefits",
      type: "array",
      of: [{ type: "membershipBenefit" }],
      // of: [{ type: "string" }],
    }, */
    {
      name: "banner",
      title: "Banner",
      type: "figure",
    },
  ],
  fieldsets: [
    {
      name: "memberCardsAndGuests",
      title: "Member Cards and Guests",
      options: {
        columns: 2,
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    select: {
      name: "name.en",
      paymentType: "paymentType",
      price: "yearlyPrice",
      donationMax: "yearlyPriceMaximum",
      benefit0: "featuredBenefits.0.title.en",
      benefit1: "featuredBenefits.1.title.en",
      benefit2: "featuredBenefits.2.title.en",
    },
    prepare: ({
      name,
      benefit0,
      benefit1,
      benefit2,
      paymentType,
      price,
      donationMax,
    }) => {
      const benefits = [benefit0, benefit1, benefit2].filter(Boolean);
      let priceString = price ? `Price: $${price}` : "";
      if (price && paymentType === "range") {
        donationMax
          ? (priceString += ` - $${donationMax}`)
          : (priceString += "+");
      }

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

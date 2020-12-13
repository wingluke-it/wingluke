import { EMAIL_REGEX, PHONE_REGEX } from "../schemaGlobals";

export default {
  name: "youthProgram",
  title: "Youth Program",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A slug is the identifying part of the URL of this youth program's web page. Use the 'Generate' button to set it to a unique ID based on the Name field. Once this is set on a published, public page, do not change it.",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "overview",
      title: "Overview",
      type: "localePortableText",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid",
      },
      // TODO description...what types of images are in this field?
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email",
        }).error("Please provide a valid email address"),
    },
    {
      name: "contactPhone",
      title: "Contact Phone Number",
      type: "string",
      description: "Pattern/Format: 123-456-7890 x123",
      validation: (Rule) =>
        Rule.regex(PHONE_REGEX, {
          name: "phone-number",
        }).warning("The recommended phone format is '123-456-7890 x123'"),
    },
    {
      name: "instagram",
      title: "Instagram",
      description:
        "If this program has an Instagram profile, please provide the link to it here.",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    },
    {
      name: "ageRange",
      title: "Age Range",
      type: "localeString",
      description:
        "Please provide the age range for youth who may participate in this program (e.g. '6 - 12 years old')",
    },
    {
      name: "price",
      title: "Price",
      type: "localeText",
      description:
        "Please provide details for the typical pricing of this program (e.g. 'Free' or '$162.50 for members').",
    },
    {
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      of: [{ type: "faq" }],
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "overview.en",
      media: "banner",
    },
  },
};

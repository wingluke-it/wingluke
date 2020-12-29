import { EMAIL_REGEX, PHONE_REGEX } from "../schemaGlobals";

export default {
  name: "wayToGive",
  title: "Way to Give",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localePortableText",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "figure",
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
        }).error("The required phone format is '123-456-7890 x123'"),
    },
    {
      name: "form",
      title: "Form",
      type: "array",
      of: [{ type: "fileWithMetadata" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "description.en",
      media: "mainImage",
    },
  },
};

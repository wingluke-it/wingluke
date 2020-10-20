import { EMAIL_REGEX } from "../schemaGlobals";

export default {
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "biography",
      title: "Biography",
      type: "localeText",
    },
    {
      name: "profilePicture",
      title: "Profile Picture",
      type: "figure",
    },
    {
      name: "featuredWork",
      title: "Featured Work",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid",
      },
    },
    {
      name: "website",
      title: "Website",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    },
    {
      name: "instagram",
      title: "Instagram",
      description: "Please provide the link to this artist's Instagram profile",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    },
    {
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email", // Error message is "Does not match email-pattern"
        }).error("Please provide a valid email address"),
    },
  ],
  preview: {
    select: {
      title: "name.en",
      media: "profilePicture",
      subtitle: "biography.en",
    },
  },
};

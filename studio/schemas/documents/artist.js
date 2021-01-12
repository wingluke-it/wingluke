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
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "To give this artist a dedicated page on wingluke.org, please set the slug. Otherwise, leave blank. A slug is the identifying part of the URL of this exhibit's web page. Use the 'Generate' button to set it to a unique ID based on the Name field. Once this is set on a published, public page, do not change it.",
      options: {
        source: "name.en",
        maxLength: 96,
      },
    },
    {
      name: "occupation",
      type: "localeString",
      title: "Title/Occupation",
      description: 'E.g. "Artist" or "Illustrator" or "Photographer", etc.',
    },
    {
      name: "discipline",
      type: "localeString",
      title: "Discipline",
      description:
        'E.g. "Japanese Calligraphy" or "Photography" or "Ceramics", etc.',
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

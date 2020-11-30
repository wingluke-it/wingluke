import moment from "moment";
import { referenceDescription } from "../schemaGlobals";

export default {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      // should this be a reference to staffMember?
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        { type: "person" },
        { type: "reference", to: [{ type: "staffMember" }] },
      ],
      description:
        referenceDescription("staff member") +
        ' Alternatively, if this blog post is authored by a non-staff member, select "+Person" and fill in the relevent details.',
    },
    // TODO category field?
    {
      // TODO fill this in programatically
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "This can be used to schedule post for publishing",
    },
    {
      // TODO fill this in programatically
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
      description:
        "Please provide a short (3-5 sentence) excerpt or preview of this blog post. This ends up on summary pages, on Google, and when people share your post in social media.",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
    },
    {
      name: "body",
      title: "Body",
      type: "localePortableText", // TODO change to blogPostLocalePortableText (so that it can have images, instagram posts, etc.)
    },
  ],
  preview: {
    select: {
      title: "title.en",
      published: "publishedAt",
      updated: "lastUpdated",
      banner: "banner",
      author0: "authors.0.name.en",
    },
    prepare(selection) {
      const { published, banner, title, author0 } = selection;
      return {
        title: title,
        subtitle: `Published on ${moment(published).format(
          "M-D-YY"
        )} by ${author0}`,
        media: banner,
      };
    },
  },
};

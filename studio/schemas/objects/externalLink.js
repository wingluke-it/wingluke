import { GoLink } from "react-icons/go";

export default {
  title: "External Link",
  name: "externalLink",
  type: "object",
  blockEditor: {
    icon: GoLink,
  },
  fields: [
    {
      title: "URL",
      name: "href",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http", "mailto", "tel"],
        }),
    },
    {
      title: "Open in new tab",
      name: "blank",
      type: "boolean",
    },
  ],
};

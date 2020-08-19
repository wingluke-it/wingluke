import { ALT_TEXT_DESCRIPTION } from "../schemaGlobals";

export default {
  name: "a11yImage",
  title: "Accessible Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alt Text",
      type: "localeString",
      options: {
        isHighlighted: true,
      },
      description: ALT_TEXT_DESCRIPTION,
    },
    {
      name: "caption",
      title: "Caption",
      type: "localeString",
      options: {
        isHighlighted: true,
      },
      description: "Give a short caption for this image.",
    },
  ],
};

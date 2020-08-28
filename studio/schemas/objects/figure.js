import { ALT_TEXT_DESCRIPTION } from "../schemaGlobals";

export default {
  name: "figure",
  title: "Figure",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alternative Text",
      type: "localeString",
      options: {
        isHighlighted: true,
        collapsible: true,
      },
      description: ALT_TEXT_DESCRIPTION,
    },
    {
      name: "caption",
      title: "Caption",
      type: "localeString",
      options: {
        isHighlighted: true,
        collapsible: true,
      },
      description: "Give a short caption for this image.",
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};

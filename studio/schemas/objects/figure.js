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
      description:
        "Give a short description of this image to be used by screen readers, web browsers (in case this image fails to load), and search engines.",
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
      title: "caption.en",
    },
  },
};

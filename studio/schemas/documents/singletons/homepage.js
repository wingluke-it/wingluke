const HOMEPAGE_TITLE = "Homepage";

export default {
  name: "homepage",
  title: HOMEPAGE_TITLE,
  type: "document",
  fields: [
    {
      name: "backgroundVideo360",
      title: "360p",
      description: "For mobile devices and small tablets",
      type: "file",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "video/*",
      },
      fieldset: "bgVids",
    },
    {
      name: "backgroundVideo480",
      title: "480p",
      description: "For large tablets",
      type: "file",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "video/*",
      },
      fieldset: "bgVids",
    },
    {
      name: "backgroundVideo720",
      title: "720p",
      description: "For laptops and small desktops",
      type: "file",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "video/*",
      },
      fieldset: "bgVids",
    },
    {
      name: "backgroundVideo1080",
      title: "1080p",
      description: "For large desktops",
      type: "file",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "video/*",
      },
      fieldset: "bgVids",
    },
    {
      name: "poster",
      title: "Poster",
      type: "figure",
      description:
        "An image to show while the background video is loading or in case the video doesn’t load at all. Ideally at least 1920x1080 and should match the first frame of the background video.",
      fieldset: "bgVids",
    },
    {
      name: "mainContent",
      title: "Main Content",
      type: "localePortableText",
    },
  ],
  fieldsets: [
    {
      name: "bgVids",
      title: "Background Videos",
      description:
        "Please provide background videos for different screen sizes. Keep file sizes below 5mb and video length to 30s or less.",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: HOMEPAGE_TITLE,
      };
    },
  },
};

export default {
  name: "person",
  title: "Person",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pronunciation",
      title: "Name Pronunciation",
      type: "localeString",
      options: {
        collapsible: true,
        collapsed: true,
      },
      description:
        "(Optional) Please provide a phonetic pronunciation of this person's name (nameshouts.com or this guide may help: https://www.ling.upenn.edu/courses/Fall_2014/ling115/phonetics.html )",
    },
    {
      name: "profilePicture",
      title: "Profile Picture",
      type: "figure",
    },
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "(Optional) Give a short (3 to 5 sentence) biography of this person.",
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "bio.en",
      media: "profilePicture",
    },
  },
};

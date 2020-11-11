export default {
  name: "fileWithMetadata",
  title: "File",
  type: "file",
  // options: {
  //   accept: ".pdf,.doc,.docx",
  // },
  fields: [
    {
      name: "name",
      title: "File Name",
      type: "string", // locale field title gets hidden in arrays
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "description",
      title: "File Description",
      type: "text", // locale field title gets hidden in arrays
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
    },
  },
};

export default {
  name: "eventOccurrences",
  title: "Occurrences",
  type: "object",
  fields: [
    {
      name: "occurrences",
      title: "Occurrences",
      type: "array",
      of: [
        {
          type: "eventOccurrence",
        },
      ],
    },
  ],
};

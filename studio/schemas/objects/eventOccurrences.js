export default {
  name: "eventOccurrences",
  title: "Event Occurrences",
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

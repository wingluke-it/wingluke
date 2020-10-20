export default {
  name: "faq",
  title: "Frequently Asked Question",
  type: "object",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "localeString",
    },
    {
      name: "answer",
      title: "Answer",
      type: "localeString",
    },
  ],
  preview: {
    select: {
      title: "question.en",
      subtitle: "answer.en",
    },
  },
};

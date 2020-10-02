export default {
  name: "curriculumGuide",
  title: "Curriculum Guide",
  type: "document",
  // TODO populate with fields based on: http://curriculum.wingluke.org/?page_id=48
  // and based on: http://curriculum.wingluke.org/?page_id=75
  // should there be a separate lessons document type?
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
};

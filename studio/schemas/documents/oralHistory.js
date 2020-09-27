export default {
  name: "oralHistory",
  title: "Oral History",
  type: "document",
  fields: [
    // TODO flesh out with more fields based on http://collections.wingluke.org/items/show/6
    {
      name: "interviewer",
      title: "Interviewer",
      type: "localeString",
    },
    {
      name: "interviewee",
      title: "Interviewee",
      type: "localeString",
    },
    {
      name: "interviewDate",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-YYYY",
      },
    },
    {
      name: "audio",
      title: "Audio",
      type: "file",
      options: {
        accept: "audio/*",
      },
    },
    {
      name: "transcript",
      title: "Transcript File", // TODO make into an array of files? for multiple languages?
      type: "file",
      options: {
        accept: ".pdf", // TODO add .doc, .txt or other types here?
      },
    },
  ],
  preview: {
    select: {
      interviewer: "interviewer.en",
      interviewee: "interviewee.en",
      date: "interviewDate",
    },
    prepare(selection) {
      const { date, interviewer, interviewee } = selection;
      return {
        title: `${interviewer} interviewing ${interviewee}`,
        subtitle: date, // TODO reformat from YYYY-MM-DD to MM-DD-YYYY
      };
    },
  },
};

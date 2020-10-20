export default {
  name: "oralHistory",
  title: "Oral History",
  type: "document",
  fields: [
    // TODO flesh out with more fields based on http://collections.wingluke.org/items/show/6
    {
      name: "subject",
      title: "Subject",
      type: "localeString",
      description:
        "Please provide the subject of what was discussed during this interview.",
    },
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
        dateFormat: "MM-DD-yyyy",
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
      type: "file", // or have this be text?
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
        subtitle: date, // TODO reformat from yyyy-MM-DD to MM-DD-yyyy
      };
    },
  },
};

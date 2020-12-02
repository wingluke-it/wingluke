import moment from "moment";

export default {
  name: "eventOccurrence",
  type: "object",
  title: "Event Occurrence",
  fields: [
    {
      name: "startDateTime",
      title: "Start Date and Time",
      type: "datetime",
      options: {
        dateFormat: "MM-DD-yyyy",
        timeFormat: "hh:mm A",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDateTime",
      title: "End Date and Time",
      type: "datetime",
      options: {
        dateFormat: "MM-DD-yyyy",
        timeFormat: "hh:mm A",
      },
      validation: (Rule) => [
        Rule.required(),
        Rule.min(Rule.valueOfField("startDateTime")).error(
          "End date and time must be after start date and time."
        ),
      ],
    },
  ],
  preview: {
    select: {
      start: "startDateTime",
      end: "endDateTime",
    },
    prepare(selection) {
      const { start, end } = selection;
      return {
        title: `Start: ${moment(start).format("M-D-YY, h:mm a")}; End: ${moment(
          end
        ).format("M-D-YY, h:mm a")}`,
      };
    },
  },
};

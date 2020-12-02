export default {
  name: "schedulingInfo",
  title: "Scheduling Info",
  type: "object",
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: "startDateTime",
      title: "First Occurrence Start Datetime",
      type: "datetime",
      options: {
        dateFormat: "MM-DD-yyyy",
        timeFormat: "hh:mm A",
      },
    },
    {
      name: "endDateTime",
      title: "First Occurrence End Datetime",
      type: "datetime",
      options: {
        dateFormat: "MM-DD-yyyy",
        timeFormat: "hh:mm A",
      },
      validation: (Rule) =>
        Rule.min(Rule.valueOfField("startDateTime")).error(
          "End date and time must be after start date and time."
        ),
    },
    {
      name: "endRepeatDate",
      title: "End Repeat Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
      description:
        "Events will not repeat after this date. Leave blank if this event should repeat indefinitely.",
      // fieldset: "recurrenceRange",
      validation: (Rule) =>
        Rule.min(Rule.valueOfField("startDateTime")).error(
          "End recurrence date must be after start date."
        ),
    },
    /* {
      name: "date",
      title: "Event Date",
      type: "date",
    },
    {
      name: "startTime",
      title: "Start Time",
      type: "string",
      description:
        "Please enter time in military time format (no AM or PM - e.g. 15:35).",
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/).error(
          "Please enter time in military time format (no AM or PM - e.g. 15:35)."
        ),
    },
    {
      name: "endTime",
      title: "End Time",
      type: "string",
      description:
        "Please enter time in military time format (no AM or PM - e.g. 15:35).",
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/).error(
          "Please enter time in military time format (no AM or PM - e.g. 15:35)."
        ),
      // TODO validate that end time isn't before start time
    }, */
    // TODO should there be an option for all day/multi-day events?
    {
      name: "recurrenceType",
      title: "Recurrence Type - Repeat:",
      type: "string",
      description:
        "Please fill out the corresponding details of your selection below. E.g. if you select the 'Daily' option, scroll down and fill out the fields under 'Daily Recurrence Details'.",
      options: {
        list: [
          // { title: "Does not repeat", value: "noRepeat" },
          { title: "Daily (e.g. repeat every 2 days)", value: "daily" },
          {
            title:
              "Weekly (e.g. repeat on Saturday and Sunday of every other week)",
            value: "weekly",
          },
          {
            title: "Absolute Monthly (e.g. repeat on the 15th of each month)",
            value: "absMonthly",
          },
          {
            title:
              "Relative Monthly (e.g. repeat every first Thursday of each month)",
            value: "relMonthly",
          },
          /*           {
            title: "Absolute Yearly (e.g. repeat on April 15th of each year)",
            value: "absYearly",
          },
          {
            title:
              "Relative Yearly (e.g. repeat on the fourth Thursday of November each year)",
            value: "relYearly",
          }, */
        ],
        layout: "radio",
      },
    },
    /*     {
      // TODO set this based on the inputted start datetime?
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
      fieldset: "recurrenceRange",
    }, */
    /*     {
      name: "doesNotRepeat",
      title: "Do not repeat (i.e. this event only occurs once).",
      type: "boolean",
    }, */
    /*     {
      name: "doesRepeatDaily",
      title: "Repeat Daily (e.g. repeat every 2 days)",
      type: "boolean",
    }, */
    {
      name: "intervalDaily",
      title: "Interval",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(99),
      description:
        "Provide the number of days between each occurrence of this event. For an event that occurs every day, input '1'.",
      fieldset: "recurrenceTypeDaily",
    },
    /*     {
      name: "doesRepeatWeekly",
      title:
        "Repeat Weekly (e.g. repeat on Saturday and Sunday of every other week)",
      type: "boolean",
    }, */
    {
      name: "intervalWeekly",
      title: "Interval",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(99),
      description:
        "Provide the number of weeks between each occurrence of this event. For an event that occurs every week, input '1'.",
      fieldset: "recurrenceTypeWeekly",
    },
    {
      name: "daysOfWeekWeekly",
      title: "Days of the Week",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sunday", value: "Sunday" },
          { title: "Monday", value: "Monday" },
          { title: "Tuesday", value: "Tuesday" },
          { title: "Wednesday", value: "Wednesday" },
          { title: "Thursday", value: "Thursday" },
          { title: "Friday", value: "Friday" },
          { title: "Saturday", value: "Saturday" },
        ],
      },
      description: "Select which days of the week this event occurs on.",
      fieldset: "recurrenceTypeWeekly",
    },
    /*     {
      name: "doesRepeatAbsMonthly",
      title: "Repeat Monthly (Absolute: e.g. repeat on the 15th of each month)",
      type: "boolean",
    }, */
    {
      name: "intervalAbsMonthly",
      title: "Interval",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(99),
      description:
        "Provide the number of months between each occurrence of this event. For an event that occurs every month, input '1'.",
      fieldset: "recurrenceTypeAbsoluteMonthly",
    },
    /*     {
      // TODO set this based on the inputted first occurrence start datetime?
      name: "dayOfMonthAbsMonthly",
      title: "Day of the Month",
      type: "number",
      // description: "This should match the day of the month of the ",
      validation: (Rule) => Rule.integer().min(1).max(31),
      fieldset: "recurrenceTypeAbsoluteMonthly",
    }, */
    /*     {
      name: "doesRepeatRelMonthly",
      title:
        "Repeat Monthly (Relative: e.g. repeat every first Thursday of each month)",
      type: "boolean",
    }, */
    {
      name: "indexRelMonthly",
      title: "Week of the Month",
      type: "array",
      of: [{ type: "string" }],
      description:
        "E.g. check 'First' and 'Second' if this event should occur on the first and second, say, Thursday of the month.",
      options: {
        list: [
          { title: "First", value: "first" },
          { title: "Second", value: "second" },
          { title: "Third", value: "third" },
          { title: "Fourth", value: "Fourth" },
          { title: "Last", value: "last" },
        ],
      },
      fieldset: "recurrenceTypeRelativeMonthly",
    },
    {
      name: "daysOfWeekRelMonthly",
      title: "Days of the Week",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sunday", value: "Sunday" },
          { title: "Monday", value: "Monday" },
          { title: "Tuesday", value: "Tuesday" },
          { title: "Wednesday", value: "Wednesday" },
          { title: "Thursday", value: "Thursday" },
          { title: "Friday", value: "Friday" },
          { title: "Saturday", value: "Saturday" },
        ],
      },
      description: "Select which days of the week this event occurs on.",
      fieldset: "recurrenceTypeRelativeMonthly",
    },
    {
      name: "intervalRelMonthly",
      title: "Interval",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(99),
      description:
        "Provide the number of months between each occurrence of this event. For an event that occurs every month, input '1'.",
      fieldset: "recurrenceTypeRelativeMonthly",
    },
  ],
  validation: (Rule) => [
    /*     Rule.custom((fields) => {
      if (
        fields &&
        fields.doesNotRepeat &&
        (fields.doesRepeatDaily ||
          fields.doesRepeatWeekly ||
          fields.doesRepeatAbsMonthly ||
          fields.doesRepeatRelMonthly)
      ) {
        return "An event cannot be set to both 'Do not repeat' and 'Repeat Daily/Weekly/Monthly'.";
      }

      return true;
    }), */
    Rule.custom((fields) => {
      if (
        fields &&
        fields.recurrenceType === "daily" &&
        !fields.intervalDaily
      ) {
        return "The 'Daily Recurrence Details' fieldset must be filled out because this event is set to repeat daily.";
      }

      return true;
    }),
    Rule.custom((fields) => {
      if (
        fields &&
        fields.recurrenceType === "weekly" &&
        (!fields.intervalWeekly ||
          fields.daysOfWeekWeekly === undefined ||
          fields.daysOfWeekWeekly.length === 0)
      ) {
        return "The 'Weekly Recurrence Details' fieldset must be filled out because this event is set to repeat weekly.";
      }

      return true;
    }),
    Rule.custom((fields) => {
      if (
        fields &&
        fields.recurrenceType === "absMonthly" &&
        !fields.intervalAbsMonthly
      ) {
        return "The 'Monthly Recurrence (Absolute) Details' fieldset must be filled out because this event is set to repeat monthly (absolute).";
      }

      return true;
    }),
    Rule.custom((fields) => {
      if (
        fields &&
        fields.recurrenceType === "relMonthly" &&
        (!fields.intervalRelMonthly ||
          fields.indexRelMonthly === undefined ||
          fields.indexRelMonthly.length === 0 ||
          fields.daysOfWeekRelMonthly === undefined ||
          fields.daysOfWeekRelMonthly.length === 0)
      ) {
        return "The 'Monthly Recurrence (Relative) Details' fieldset must be filled out because this event is set to repeat monthly (relative).";
      }

      return true;
    }),
  ],
  fieldsets: [
    {
      name: "recurrenceRange",
      title: "Recurrence Range",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "recurrenceTypeDaily",
      title: "Daily Recurrence Details",
      description:
        "Please fill out these fields if this event is set to repeat daily.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "recurrenceTypeWeekly",
      title: "Weekly Recurrence Details",
      description:
        "Please fill out these fields if this event is set to repeat weekly.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "recurrenceTypeAbsoluteMonthly",
      title: "Monthly Recurrence (Absolute) Details",
      description:
        "Please fill out these fields if this event is set to repeat monthly (absolute).",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "recurrenceTypeRelativeMonthly",
      title: "Monthly Recurrence (Relative) Details",
      description:
        "Please fill out these fields if this event is set to repeat monthly (relative).",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    /* {
      name: "recurrenceTypeAbsoluteYearly",
      title: "Recurrence Type - Absolute Yearly",
      description:
        "The recurrence type must be set to 'Repeat: Absolute Yearly' for these fields to take effect.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "recurrenceTypeRelative",
      title: "Recurrence Type - Relative Yearly",
      description:
        "The recurrence type must be set to 'Repeat: Relative Yearly' for these fields to take effect.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    }, */
  ],
};

import { EMAIL_REGEX } from "../../schemaGlobals";

const EVENT_SPACE_USAGE_TITLE = "Event Space Usage";

// TODO put this information under shopGuide
export default {
  name: "eventSpaceUsage",
  title: EVENT_SPACE_USAGE_TITLE,
  type: "document",
  fields: [
    // TODO factor out into an emailField object
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(EMAIL_REGEX, {
          name: "email", // Error message is "Does not match email-pattern"
        }).error("Please provide a valid email address"),
    },
    {
      name: "venueDetailsFile",
      title: "Venue Details File",
      type: "file",
    },
    // TODO see https://www.wingluke.org/join-give/ for more needed fields
  ],
  preview: {
    prepare() {
      return {
        title: EVENT_SPACE_USAGE_TITLE,
      };
    },
  },
};

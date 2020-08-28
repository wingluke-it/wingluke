import { EMAIL_REGEX } from "../../schemaGlobals";

const SPACE_RENTAL_GUIDE_TITLE = "Space Rental Guide";

export default {
  name: "spaceRentalGuide",
  title: SPACE_RENTAL_GUIDE_TITLE,
  type: "document",
  fields: [
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
        title: SPACE_RENTAL_GUIDE_TITLE,
      };
    },
  },
};

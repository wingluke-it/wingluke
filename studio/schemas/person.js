import { EMAIL_FIELD, PHONE_FIELD, REQUIRED_NAME_FIELD } from "./schemaGlobals";

export default {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    REQUIRED_NAME_FIELD,
    {
      name: "profilePicture",
      title: "Profile Picture",
      type: "a11yImage",
    },
    EMAIL_FIELD,
    PHONE_FIELD,
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description: "Give a short (3 to 5 sentence) biography of this person.",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "profilePicture",
    },
  },
};

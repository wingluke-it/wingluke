import { EMAIL_FIELD, PHONE_FIELD, REQUIRED_NAME_FIELD } from "./schemaGlobals";

export default {
  name: "organization",
  title: "Organization",
  type: "document",
  fields: [
    REQUIRED_NAME_FIELD,
    {
      name: "logo",
      title: "Organization Logo",
      type: "a11yImage",
    },
    EMAIL_FIELD,
    PHONE_FIELD,
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this organization.",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
};

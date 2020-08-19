import { REQUIRED_NAME_FIELD } from "./schemaGlobals";

export default {
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    REQUIRED_NAME_FIELD,
    {
      name: "mission",
      title: "Department Mission",
      type: "localeText",
      description:
        "Please provide a short (3 to 5 sentence) description of this department's mission and goals at The Wing.",
    },
  ],
};

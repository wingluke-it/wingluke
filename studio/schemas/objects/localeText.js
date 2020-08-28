import { LANGUAGES_SUPPORTED } from "../schemaGlobals";

export default {
  name: "localeText",
  type: "object",
  title: "Localized Portable Text",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: LANGUAGES_SUPPORTED.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "text",
    fieldset: lang.isDefault ? null : "translations",
  })),
};

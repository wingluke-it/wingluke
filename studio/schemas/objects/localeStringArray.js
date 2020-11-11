import { LANGUAGES_SUPPORTED } from "../schemaGlobals";

export default {
  name: "localeStringArray",
  type: "object",
  title: "Localized String Array",
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
    type: "array",
    of: [{ type: "string" }],
    fieldset: lang.isDefault ? null : "translations",
  })),
};

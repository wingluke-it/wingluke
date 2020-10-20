import { LANGUAGES_SUPPORTED } from "../schemaGlobals";

export default {
  name: "localeString",
  type: "object",
  title: "Localized String",
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
    type: "string",
    fieldset: lang.isDefault ? null : "translations",
    // validation: (Rule) =>
    //   Rule.custom((val) => {
    //     if (lang.isDefault && !val) {
    //       for (let language of LANGUAGES_SUPPORTED) {
    //         if (!language.isDefault && Rule.valueOfField(language.id) !== "") {
    //           console.log(Rule.valueOfField(language.id));
    //           return "A non-default language field cannot be filled out if the default language field is empty.";
    //         }
    //       }
    //     }

    //     return true;
    //   }),
  })),
};

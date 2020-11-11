import { LANGUAGES_SUPPORTED } from "../schemaGlobals";

export default {
  name: "figure",
  title: "Figure",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: LANGUAGES_SUPPORTED.map((lang) => ({
    title: `Alternative Text (${lang.title})`,
    name: `alt_${lang.id}`,
    type: "string",
    description: `(Required) Give a short description of this image to be used by screen readers (for accessibility), web browsers (in case this image fails to load), and search engines.${
      lang.isDefault
        ? " Click the edit button for this image to provide translations."
        : ""
    }`,
    options: {
      isHighlighted: lang.isDefault,
      collapsible: true,
    },
    fieldset: lang.isDefault ? null : "translations", // TODO this does nothing currently
  })).concat(
    LANGUAGES_SUPPORTED.map((lang) => ({
      title: `Caption (${lang.title})`,
      name: `caption_${lang.id}`,
      type: "string",
      description: `(Optional) Give a short caption for this image.${
        lang.isDefault
          ? " Click the edit button for this image to provide translations."
          : ""
      }`,
      options: {
        isHighlighted: lang.isDefault,
        collapsible: true,
      },
      fieldset: lang.isDefault ? null : "translations", // TODO this does nothing currently
    }))
  ),
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "alt_en",
      subtitle: "caption_en",
    },
  },
};

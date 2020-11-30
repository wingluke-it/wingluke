export const LANGUAGES_SUPPORTED = [
    { id: "en", title: "English", isDefault: true },
    { id: "es", title: "Spanish" },
    { id: "ja", title: "Japanese" },
  ],
  EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  PHONE_REGEX = /^(\d\d\d-?\s?\d\d\d-?\s?\d\d\d\d\s?)?(x\d\d\d\d?)?$/,
  referenceDescription = (docType) =>
    `Don't see the ${docType} you need? Please create a new ${docType} document by clicking the icon in the top-left toolbar (looks like a small pencil on paper) and then selecting "${
      docType.charAt(0).toUpperCase() + docType.slice(1)
    }." After filling out the new ${docType} document's fields, you will then find it listed in this dropdown.`;
/*
export const ALT_TEXT_DESCRIPTION =
    "Give a short description of this image to be used by screen readers, web browsers (in case this image fails to load), and search engines.",
  // TODO factor these out into their own objects
   EMAIL_FIELD = {
    name: "email",
    title: "Email",
    type: "string",
    validation: (Rule) =>
      Rule.regex(EMAIL_REGEX, {
        name: "email", // Error message is "Does not match email-pattern"
      }).error("Please provide a valid email address"),
  },
  PHONE_FIELD = {
    name: "phone",
    title: "Phone Number",
    type: "string",
    description: "Pattern/Format: 123-456-7890",
    validation: (Rule) =>
      Rule.regex(PHONE_REGEX, {
        name: "phone-number",
      }).warning("The recommended phone format is '123-456-7890'"),
  }, */

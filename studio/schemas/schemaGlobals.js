const PHONE_REGEX = /^[2-9]\d{2}-\d{3}-\d{4}$/;

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
  EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  PHONE_FIELD = {
    name: "phone",
    title: "Phone Number",
    type: "string",
    description: "Pattern/Format: 123-456-7890",
    validation: (Rule) =>
      Rule.regex(PHONE_REGEX, {
        name: "phone-number",
      }).warning("The recommended phone format is '123-456-7890'"),
  },
  LANGUAGES_SUPPORTED = [
    { id: "en", title: "English", isDefault: true },
    { id: "es", title: "Spanish" },
    { id: "ja", title: "Japanese" },
  ];

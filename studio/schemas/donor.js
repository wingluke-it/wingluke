import { REQUIRED_NAME_FIELD } from "./schemaGlobals";

export default {
  name: "donor",
  title: "Donor",
  type: "document",
  fields: [
    {
      name: "personOrgRef",
      title: "Person or Organization",
      type: "reference",
      to: [{ type: "person" }, { type: "organization" }],
    },
  ],
  preview: {
    select: {
      title: "personOrgRef.name",
      logo: "personOrgRef.logo",
      profilePicture: "personOrgRef.profilePicture",
    },
    prepare(selection) {
      const { title, logo, profilePicture } = selection;
      return {
        title: title,
        media: profilePicture || logo,
      };
    },
  },
};

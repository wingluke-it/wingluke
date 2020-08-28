export default {
  name: "household",
  title: "Household",
  type: "document",
  fields: [
    {
      name: "members",
      title: "Household Members",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "individual",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().unique(),
    },
    {
      name: "householdPicture",
      title: "Household Picture",
      type: "figure",
    },
    {
      name: "bio",
      title: "Biography",
      type: "localeText",
      description:
        "Give a short (3 to 5 sentence) biography of this household.",
    },
  ],
  preview: {
    select: {
      media: "householdPicture",
      member0: "members.0.name.en",
      member1: "members.1.name.en",
      member2: "members.2.name.en",
      member3: "members.3.name.en",
      bio: "bio.en",
    },
    prepare: ({ media, member0, member1, member2, member3, bio }) => {
      console.log(member0);
      const members = [member0, member1, member2].filter(Boolean);
      console.log(members);
      const title =
        members.length > 0 ? `Household of ${members.join(", ")}` : "";
      const hasMoreMembers = Boolean(member3);
      return {
        media: media,
        title: hasMoreMembers ? `${title}, ...` : title,
        subtitle: bio,
      };
    },
  },
};

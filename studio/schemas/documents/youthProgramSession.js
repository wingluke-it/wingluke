import { referenceDescription } from "../schemaGlobals";

export default {
  name: "youthProgramSession",
  title: "Youth Program Session",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A slug is the identifying part of the URL of this youth program session's web page. Use the 'Generate' button to set it to a unique ID based on the Name field. Once this is set on a published, public page, do not change it.",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Type of Youth Program",
      type: "reference",
      to: [{ type: "youthProgram" }],
    },
    {
      name: "overview",
      title: "Overview",
      type: "localePortableText",
      description:
        "Please provide an overview of this session. Schedule details may be provided below.",
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid",
      },
      // TODO description...what types of images are in this field?
    },
    /*     {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Upcoming", "Current", "Past"],
        layout: "radio",
      },
    }, */
    {
      name: "startDate",
      title: "Session Start Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
    },
    {
      name: "regOpeningDate",
      title: "Registration Opening Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
    },
    {
      name: "regClosingDate",
      title: "Registration Closing Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
    },
    {
      name: "endDate",
      title: "Session End Date",
      type: "date",
      options: {
        dateFormat: "MM-DD-yyyy",
      },
    },
    {
      name: "registrationLink",
      title: "Registration Link",
      description:
        "This will only display after the registration opening date and up until the registration closing date.",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "localePortableText",
      description:
        "Please provide details for the schedule of this session, including important dates and times, activities planned, etc.",
    },
    {
      name: "capacity",
      title: "Participant Max Capacity",
      type: "localeString",
      description: "e.g. 20 campers per week",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: ["Virtual", "Onsite"],
        layout: "radio",
      },
    },
    {
      name: "teachingArtists",
      title: "Teaching Artists",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      description: referenceDescription("artist"),
    },
    {
      name: "communityPartners",
      title: "Community Partners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "communityPartner" }] }],
      description: referenceDescription("community partner"),
    },
    {
      name: "participants",
      title: "Participants",
      description:
        "After this session has started, you may record the names, bios, and (optionally) the profile pictures of the youth participants here.",
      type: "array",
      of: [{ type: "person" }],
    },
    {
      name: "staff",
      title: "Staff",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "staffMember" }] },
        { type: "person" },
      ],
      description:
        referenceDescription("staff member") +
        ' Alternatively, if this session is staffed by a non-staff member, select "+Person" and fill in the relevent details.',
    },
    // TODO add password-protection for blog?
    {
      name: "participantResources",
      title: "Resources for Participants",
      type: "array",
      of: [
        {
          type: "fileWithMetadata",
          /* options: { // TODO what types of files should be accepted? all types?
            accept: ".pdf,.doc",
          }, */
        },
      ],
    },
    {
      name: "parentResources",
      title: "Resources for Parents",
      type: "array",
      of: [
        {
          type: "fileWithMetadata",
          /* options: { // TODO what types of files should be accepted? all types?
            accept: ".pdf,.doc",
          }, */
        },
      ],
    },
    {
      name: "blogPosts",
      title: "Blog Posts",
      description:
        "Updates for youth participants and their parents may be provided here when the program is in session.",
      type: "array",
      of: [{ type: "blogPost" }],
    },
    // the exhibit created by this youth program session can alternatively be inferred from the exhibit document type's curatedBy field
    {
      name: "exhibitCreated",
      title: "Exhibit Created",
      type: "reference",
      to: [{ type: "exhibit" }],
      description:
        "(Optional) Provide the exhibit that this program created. " +
        referenceDescription("exhibit"),
    },
    {
      name: "sponsors",
      title: "Sponsors",
      type: "sponsorList",
      options: {
        collapsible: true,
      },
    },
    // TODO forms to sign field?
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "overview.en",
    },
  },
};

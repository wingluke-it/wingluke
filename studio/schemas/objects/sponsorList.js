import { referenceDescription } from "../schemaGlobals";

const refDescription =
  "Don't see the sponsor you need? Please follow the directions under the Presenting Season Sponsors field above.";

export default {
  name: "sponsorList",
  title: "Sponsor List",
  type: "object",
  fields: [
    // TODO lots of duplicated code below...maybe factor these out into schemaGlobals and use SPONSOR_LEVELS.map() to generate
    // the below fields.
    {
      name: "presentingSeasonSponsors",
      title: "Presenting Season Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: referenceDescription("sponsor"),
    },
    {
      name: "seasonSponsors",
      title: "Season Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "leadSponsors",
      title: "Lead Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "primeSponsors",
      title: "Prime Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "majorSponsors",
      title: "Major Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "supportingSponsors",
      title: "Supporting Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "partnerSponsors",
      title: "Partner Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "friendSponsors",
      title: "Friend Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "mediaSponsors",
      title: "Media Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
    {
      name: "creativeSponsors",
      title: "Creative Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
      description: refDescription,
    },
  ],
};

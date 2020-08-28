// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// singleton documents
import museumMeta from "./documents/singletons/museumMeta";
import visitorGuide from "./documents/singletons/visitorGuide";
import giveGuide from "./documents/singletons/giveGuide";
import joinGuide from "./documents/singletons/joinGuide";
import spaceRentalGuide from "./documents/singletons/spaceRentalGuide";

// constituents
import individual from "./documents/constituents/individual";
import household from "./documents/constituents/household";
import organization from "./documents/constituents/organization";

// other documents
import department from "./documents/department";
import artifact from "./documents/artifact";
import exhibit from "./documents/exhibit";
import gallery from "./documents/gallery";
import program from "./documents/program";
import story from "./documents/story";
import tour from "./documents/tour";

// objects
import localeString from "./objects/localeString";
import localeText from "./objects/localeText";
import localePortableText from "./objects/localePortableText";
import portableText from "./objects/portableText";
import figure from "./objects/figure";
import schedulingInfo from "./objects/schedulingInfo";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // singleton documents:
    museumMeta,
    visitorGuide,
    giveGuide,
    joinGuide,
    spaceRentalGuide,

    // constituents
    individual,
    organization,
    household,

    // documents
    artifact,
    department,
    exhibit,
    gallery,
    program,
    story,
    tour,

    // objects (non-documents):
    figure,
    localeString,
    localeText,
    localePortableText,
    portableText,
    schedulingInfo,
  ]),
});

// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// singleton documents
import cacProcess from "./documents/singletons/cacProcess";
import eventSpaceUsage from "./documents/singletons/eventSpaceUsage";
import museumMeta from "./documents/singletons/museumMeta";
import visitorGuide from "./documents/singletons/visitorGuide";

// constituents

// other documents
import artist from "./documents/artist";
import collectionsObject from "./documents/collectionsObject";
import event from "./documents/event";
import exhibit from "./documents/exhibit";
import gallery from "./documents/gallery";
import eventSpace from "./documents/eventSpace";
import marketplaceProduct from "./documents/marketplaceProduct";
import oralHistory from "./documents/oralHistory";
import sponsor from "./documents/sponsor";
import story from "./documents/story";
import tour from "./documents/tour";
import youthProgramSession from "./documents/youthProgramSession";
import youthProgram from "./documents/youthProgram";

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
    cacProcess,
    eventSpaceUsage,
    museumMeta,
    visitorGuide,

    // constituents

    // documents
    artist,
    collectionsObject,
    event,
    eventSpace,
    exhibit,
    gallery,
    marketplaceProduct,
    oralHistory,
    sponsor,
    story,
    tour,
    youthProgram,
    youthProgramSession,

    // objects (non-documents):
    figure,
    localeString,
    localeText,
    localePortableText,
    portableText,
    schedulingInfo,
  ]),
});

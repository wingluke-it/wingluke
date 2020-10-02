// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// singleton documents
import cacProcess from "./documents/singletons/cacProcess";
import donorProgram from "./documents/singletons/donorProgram";
import eventSpaceUsage from "./documents/singletons/eventSpaceUsage";
import marketplace from "./documents/singletons/marketplace";
import membershipProgram from "./documents/singletons/membershipProgram";
import museumMeta from "./documents/singletons/museumMeta";
import visitorGuide from "./documents/singletons/visitorGuide";
import volunteerProgram from "./documents/singletons/volunteerProgram";

// constituents

// other documents
import artist from "./documents/artist";
import blogPost from "./documents/blogPost";
import collectionsObject from "./documents/collectionsObject";
import communityPartner from "./documents/communityPartner";
import curriculumGuide from "./documents/curriculumGuide";
import department from "./documents/department";
import educatorWorkshop from "./documents/educatorWorkshop";
import event from "./documents/event";
import exhibit from "./documents/exhibit";
import gallery from "./documents/gallery";
import historicSpace from "./documents/historicSpace";
import eventSpace from "./documents/eventSpace";
import marketplaceProduct from "./documents/marketplaceProduct";
import oralHistory from "./documents/oralHistory";
import sponsor from "./documents/sponsor";
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
    donorProgram,
    eventSpaceUsage,
    marketplace,
    membershipProgram,
    museumMeta,
    visitorGuide,
    volunteerProgram,

    // constituents

    // documents
    artist,
    blogPost,
    collectionsObject,
    communityPartner,
    curriculumGuide,
    department,
    educatorWorkshop,
    event,
    eventSpace,
    exhibit,
    gallery,
    historicSpace,
    marketplaceProduct,
    oralHistory,
    sponsor,
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

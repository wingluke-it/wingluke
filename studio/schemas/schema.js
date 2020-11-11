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

// other documents
import artist from "./documents/artist";
import blogPost from "./documents/blogPost";
import collection from "./documents/collection";
import collectionItem from "./documents/collectionItem";
import communityPartner from "./documents/communityPartner";
import curriculumGuide from "./documents/curriculumGuide";
import department from "./documents/department";
import educatorWorkshop from "./documents/educatorWorkshop";
import event from "./documents/event";
import exhibit from "./documents/exhibit";
import gallery from "./documents/gallery";
import historicSite from "./documents/historicSite";
import eventSpace from "./documents/eventSpace";
import marketplaceProduct from "./documents/marketplaceProduct";
import oralHistory from "./documents/oralHistory";
import sponsor from "./documents/sponsor";
import staffMember from "./documents/staffMember";
import tour from "./documents/tour";
import youthProgramSession from "./documents/youthProgramSession";
import youthProgram from "./documents/youthProgram";

// objects
import eventOccurrence from "./objects/eventOccurrence";
import eventOccurrences from "./objects/eventOccurrences";
import externalLink from "./objects/externalLink";
import faq from "./objects/faq";
import figure from "./objects/figure";
import fileWithMetadata from "./objects/fileWithMetadata";
import localeString from "./objects/localeString";
import localeStringArray from "./objects/localeStringArray";
import localeText from "./objects/localeText";
import localePortableText from "./objects/localePortableText";
import location from "./objects/location";
import membershipLevel from "./objects/membershipLevel";
import person from "./objects/person";
import portableText from "./objects/portableText";
import schedulingInfo from "./objects/schedulingInfo";
import sponsorList from "./objects/sponsorList";
import visitorGuideTicket from "./objects/visitorGuideTicket";
import wayToGive from "./objects/wayToGive";

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

    // documents
    artist,
    blogPost,
    collection,
    collectionItem,
    communityPartner,
    curriculumGuide,
    department,
    educatorWorkshop,
    event,
    eventSpace,
    exhibit,
    gallery,
    historicSite,
    marketplaceProduct,
    oralHistory,
    sponsor,
    staffMember,
    tour,
    youthProgram,
    youthProgramSession,

    // objects (non-documents):
    eventOccurrence,
    eventOccurrences,
    externalLink,
    faq,
    figure,
    fileWithMetadata,
    localeString,
    localeStringArray,
    localeText,
    localePortableText,
    location,
    membershipLevel,
    person,
    portableText,
    schedulingInfo,
    sponsorList,
    visitorGuideTicket,
    wayToGive,
  ]),
});

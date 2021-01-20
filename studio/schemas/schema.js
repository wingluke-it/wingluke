import artist from "./documents/artist";
import blogPost from "./documents/blogPost";
import cacProcess from "./documents/singletons/cacProcess";
import collection from "./documents/collection";
import collectionItem from "./documents/collectionItem";
import communityPartner from "./documents/communityPartner";
import createSchema from "part:@sanity/base/schema-creator";
import curriculumGuide from "./documents/curriculumGuide";
import department from "./documents/department";
import donorProgram from "./documents/singletons/donorProgram";
import educatorWorkshop from "./documents/educatorWorkshop";
import event from "./documents/event";
import eventOccurrence from "./objects/eventOccurrence";
import eventOccurrences from "./objects/eventOccurrences";
import eventSpace from "./documents/eventSpace";
import eventSpaceUsage from "./documents/singletons/eventSpaceUsage";
import exhibit from "./documents/exhibit";
import externalLink from "./objects/externalLink";
import faq from "./objects/faq";
import figure from "./objects/figure";
import fileWithMetadata from "./objects/fileWithMetadata";
import gallery from "./documents/gallery";
import historicSite from "./documents/historicSite";
import hours from "./documents/singletons/visit/hours";
import localePortableText from "./objects/localePortableText";
import localeString from "./objects/localeString";
import localeStringArray from "./objects/localeStringArray";
import localeText from "./objects/localeText";
import location from "./objects/location";
import marketplace from "./documents/singletons/marketplace";
import marketplaceProduct from "./documents/marketplaceProduct";
import membershipBenefit from "./objects/membershipBenefit";
import membershipLevel from "./documents/membershipLevel";
import membershipProgram from "./documents/singletons/membershipProgram";
import museumMeta from "./documents/singletons/museumMeta";
import oralHistory from "./documents/oralHistory";
import person from "./objects/person";
import portableText from "./objects/portableText";
import schedulingInfo from "./objects/schedulingInfo";
import schemaTypes from "all:part:@sanity/base/schema-type";
import sponsor from "./documents/sponsor";
import sponsorList from "./objects/sponsorList";
import staffMember from "./documents/staffMember";
import ticketType from "./objects/ticketType";
import tickets from "./documents/singletons/visit/tickets";
import tour from "./documents/tour";
import visitorGuide from "./documents/singletons/visit/visitorGuide";
import volunteerProgram from "./documents/singletons/volunteerProgram";
import wayToGive from "./objects/wayToGive";
import youthProgram from "./documents/youthProgram";
import youthProgramSession from "./documents/youthProgramSession";
import homepage from "./documents/singletons/homepage";

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
    homepage,
    marketplace,
    membershipProgram,
    museumMeta,
    volunteerProgram,
    // /visit/
    visitorGuide,
    hours,
    tickets,

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
    membershipLevel,
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
    membershipBenefit,
    person,
    portableText,
    schedulingInfo,
    sponsorList,
    ticketType,
    wayToGive,
  ]),
});

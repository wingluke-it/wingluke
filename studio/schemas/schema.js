// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// singleton documents
import museumMeta from "./singletons/museumMeta";
import facilitiesInfo from "./singletons/facilitiesInfo";

// constituents
import person from "./person";
import boardMember from "./boardMember";
import staffMember from "./staffMember";

import department from "./department";
import donor from "./donor";
import artifact from "./artifact";
import exhibit from "./exhibit";
import program from "./program";
import sponsor from "./sponsor";
import story from "./story";
import tour from "./tour";

// objects
import localeString from "./non_documents/localeString";
import localeText from "./non_documents/localeText";
import localePortableText from "./non_documents/localePortableText";
import a11yImage from "./non_documents/a11yImage";
import organization from "./organization";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // singleton documents:
    museumMeta,
    facilitiesInfo,

    // constituents
    person,
    organization,
    boardMember,
    staffMember,

    // documents
    artifact,
    department,
    donor,
    exhibit,
    program,
    sponsor,
    story,
    tour,

    // objects (non-documents):
    a11yImage,
    localeString,
    localeText,
    localePortableText,
  ]),
});

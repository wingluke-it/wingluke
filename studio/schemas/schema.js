// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import test from "./test";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    test,
    {
      name: "person",
      type: "document",
      title: "Person",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
        },
      ],
    },
    {
      name: "book",
      type: "document",
      title: "Book",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
        },
        {
          name: "cover",
          type: "image",
          title: "Cover",
        },
        {
          name: "publishDate",
          type: "datetime",
          title: "Publish Date",
        },
        {
          name: "website",
          type: "url",
          title: "Website",
        },
        {
          name: "authors",
          title: "Authors",
          type: "array",
          of: [
            {
              type: "image",
            },
            {
              type: "reference",
              to: [{ type: "person" }, { type: "test" }],
            },
          ],
        },
      ],
    },
  ]),
});

import { GoLink, GoLinkExternal } from "react-icons/go";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'portableText'
 *  }
 */
export default {
  title: "Portable Text",
  name: "portableText",
  type: "array",
  of: [
    { type: "reference", to: [{ type: "collectionsObject" }] },
    { type: "figure" },
    { type: "image" },
    // TODO add a schema type here for a button / CTA (which links to another page)
    {
      title: "Block",
      type: "block",
      /**
       * An array of inline content types that you can place in running text from the Insert menu.
       */
      of: [{ type: "reference", to: [{ type: "collectionsObject" }] }],
      /**
       * Styles let you set what your user can mark up blocks with. These
       * corrensponds with HTML tags, but you can set any title or value
       * you want and decide how you want to deal with it where you want to
       * use your content.
       */
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      /* Marks let you mark up inline text in the block editor. */
      marks: {
        /**
         * Decorators usually describe a single property – e.g. a typographic preference or highlighting by editors.
         * */
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
        ],
        /* Annotations can be any object structure – e.g. a link or a footnote. */
        annotations: [
          // TODO do these objects need to be hoisted? for GraphQL
          {
            title: "Internal link",
            name: "internalLink",
            type: "object",
            blockEditor: {
              icon: GoLink,
            },
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [{ type: "sponsor" }, { type: "exhibit" }], // TODO update this
              },
            ],
          },
          {
            title: "External Link",
            name: "externalLink",
            type: "object",
            blockEditor: {
              icon: GoLinkExternal,
            },
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["https", "http", "mailto", "tel"],
                  }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                description: "Read https://css-tricks.com/use-target_blank/",
                type: "boolean",
              },
            ],
          },
        ],
      },
    },
  ],
};

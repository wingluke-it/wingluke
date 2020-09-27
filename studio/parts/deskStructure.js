// S stands for structure Builder
import S from "@sanity/desk-tool/structure-builder";
import { FaYinYang, FaSuitcaseRolling } from "react-icons/fa";
import { GiPartyFlags } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import pluralize from "pluralize";
import cacProcess from "../schemas/documents/singletons/cacProcess";
import museumMeta from "../schemas/documents/singletons/museumMeta";
import visitorGuide from "../schemas/documents/singletons/visitorGuide";
import eventSpaceUsage from "../schemas/documents/singletons/eventSpaceUsage";

export const SINGLETON_TYPES = [
    "museumMeta",
    "visitorGuide",
    "eventSpaceUsage",
    "cacProcess",
  ],
  HIDDEN_TYPES = [
    /* if you put a document in a folder, list it here to hide it from the top-level document list of the studio */
  ];

export default () =>
  S.list()
    .title("Wing Luke Museum Content")
    .items([
      S.listItem()
        .title(cacProcess.title)
        .icon(IoIosPeople)
        .child(
          S.editor().schemaType(cacProcess.name).documentId(cacProcess.name)
        ),
      S.listItem()
        .title(museumMeta.title)
        .icon(FaYinYang)
        .child(
          S.editor().schemaType(museumMeta.name).documentId(museumMeta.name)
        ),
      // S.listItem()
      //   .title("Action Guides")
      //   .icon(IoIosInformationCircleOutline)
      //   .child(
      //     S.list()
      //       .title("Action Guides")
      //       .items([
      S.listItem()
        .title(visitorGuide.title)
        .icon(FaSuitcaseRolling)
        .child(
          S.editor().schemaType(visitorGuide.name).documentId(visitorGuide.name)
        ),
      S.listItem()
        .title(eventSpaceUsage.title)
        .icon(GiPartyFlags)
        .child(
          S.editor()
            .schemaType(eventSpaceUsage.name)
            .documentId(eventSpaceUsage.name)
        ),
      // ])
      // ),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            ![...SINGLETON_TYPES, ...HIDDEN_TYPES].includes(listItem.getId())
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle()))),
    ]);

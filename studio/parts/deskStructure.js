import { AiFillClockCircle, AiFillShop, AiOutlineIdcard } from "react-icons/ai";
import {
  FaHandHoldingHeart,
  FaHandHoldingUsd,
  FaSuitcaseRolling,
  FaTicketAlt,
  FaYinYang,
} from "react-icons/fa";

import { GiPartyFlags } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import S from "@sanity/desk-tool/structure-builder";
import cacProcess from "../schemas/documents/singletons/cacProcess";
import donorProgram from "../schemas/documents/singletons/donorProgram";
import eventSpaceUsage from "../schemas/documents/singletons/eventSpaceUsage";
import hours from "../schemas/documents/singletons/visit/hours";
import marketplace from "../schemas/documents/singletons/marketplace";
import membershipProgram from "../schemas/documents/singletons/membershipProgram";
import museumMeta from "../schemas/documents/singletons/museumMeta";
import pluralize from "pluralize";
import tickets from "../schemas/documents/singletons/visit/tickets";
import visitorGuide from "../schemas/documents/singletons/visit/visitorGuide";
import volunteerProgram from "../schemas/documents/singletons/volunteerProgram";

export const SINGLETON_TYPES = [
    "cacProcess",
    "donorProgram",
    "eventSpaceUsage",
    "hours",
    "marketplace",
    "membershipProgram",
    "museumMeta",
    "tickets",
    "visitorGuide",
    "volunteerProgram",
  ],
  HIDDEN_TYPES = [
    /* if you put a document in a folder, list it here to hide it from the top-level document list of the studio */
    "membershipLevel",
  ];

export default () =>
  S.list()
    .title("WLM Stories and Experiences")
    .items([
      S.listItem()
        .title(cacProcess.title)
        .icon(IoIosPeople)
        .child(
          S.editor().schemaType(cacProcess.name).documentId(cacProcess.name)
        ),
      S.listItem()
        .title(donorProgram.title)
        .icon(FaHandHoldingUsd)
        .child(
          S.editor().schemaType(donorProgram.name).documentId(donorProgram.name)
        ),
      S.listItem()
        .title(eventSpaceUsage.title)
        .icon(GiPartyFlags)
        .child(
          S.editor()
            .schemaType(eventSpaceUsage.name)
            .documentId(eventSpaceUsage.name)
        ),
      S.listItem()
        .title(marketplace.title)
        .icon(AiFillShop)
        .child(
          S.editor().schemaType(marketplace.name).documentId(marketplace.name)
        ),
      S.listItem()
        .title("Membership Program")
        .icon(AiOutlineIdcard)
        .child(
          S.documentList()
            .title("Membership Program")
            .filter(
              `_type == "${membershipProgram.name}" || _type == "membershipLevel"`
            )
            .defaultOrdering([{ field: "yearlyPrice", direction: "asc" }])
          // .defaultOrdering([{ field: "_type", direction: "desc" }])
          /* S.list()
            .title(membershipProgram.title)
            .items([
              S.listItem()
                .title(membershipProgram.title)
                .icon(AiOutlineIdcard)
                .child(
                  S.editor()
                    .schemaType(membershipProgram.name)
                    .documentId(membershipProgram.name)
                ),
              S.listItem()
                .title("Membership Levels")
                .schemaType("membershipLevel")
                .child(
                  S.documentTypeList("membershipLevel").title(
                    "Membership Levels"
                  )
                ),
            ]) */
        ),
      S.listItem()
        .title(museumMeta.title)
        .icon(FaYinYang)
        .child(
          S.editor().schemaType(museumMeta.name).documentId(museumMeta.name)
        ),
      S.listItem()
        .title("Visitor Guide")
        .icon(FaSuitcaseRolling)
        .child(
          S.list()
            .title("Visit Pages")
            .items([
              S.listItem()
                .title(visitorGuide.title)
                .icon(FaSuitcaseRolling)
                .child(
                  S.editor()
                    .schemaType(visitorGuide.name)
                    .documentId(visitorGuide.name)
                ),
              S.listItem()
                .title(tickets.title)
                .icon(FaTicketAlt)
                .child(
                  S.editor().schemaType(tickets.name).documentId(tickets.name)
                ),
              S.listItem()
                .title(hours.title)
                .icon(AiFillClockCircle)
                .child(
                  S.editor().schemaType(hours.name).documentId(hours.name)
                ),
            ])
        ),
      S.listItem()
        .title(volunteerProgram.title)
        .icon(FaHandHoldingHeart)
        .child(
          S.editor()
            .schemaType(volunteerProgram.name)
            .documentId(volunteerProgram.name)
        ),
      // ])
      // ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            ![...SINGLETON_TYPES, ...HIDDEN_TYPES].includes(listItem.getId())
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle()))),
    ]);

// S stands for structure Builder
import S from "@sanity/desk-tool/structure-builder";
import { SINGLETON_TYPES, HIDDEN_TYPES } from "../schemas/schemaGlobals";
import {
  FaYinYang,
  FaHandHoldingHeart,
  FaRegHandshake,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { IoIosInformationCircleOutline, IoIosPeople } from "react-icons/io";
import { GiPartyFlags } from "react-icons/gi";
import pluralize from "pluralize";
import museumMeta from "../schemas/documents/singletons/museumMeta";
import visitorGuide from "../schemas/documents/singletons/visitorGuide";
import individual from "../schemas/documents/constituents/individual";
import organization from "../schemas/documents/constituents/organization";
import household from "../schemas/documents/constituents/household";
import giveGuide from "../schemas/documents/singletons/giveGuide";
import joinGuide from "../schemas/documents/singletons/joinGuide";
import spaceRentalGuide from "../schemas/documents/singletons/spaceRentalGuide";

export default () =>
  S.list()
    .title("Wing Luke Museum Content")
    .items([
      S.listItem()
        .title("Guides")
        .icon(IoIosInformationCircleOutline)
        .child(
          S.list()
            .title("Guides")
            .items([
              S.listItem()
                .title(museumMeta.title)
                .icon(FaYinYang)
                .child(
                  S.editor()
                    .schemaType(museumMeta.name)
                    .documentId(museumMeta.name)
                ),
              S.listItem()
                .title(visitorGuide.title)
                .icon(FaSuitcaseRolling)
                .child(
                  S.editor()
                    .schemaType(visitorGuide.name)
                    .documentId(visitorGuide.name)
                ),
              S.listItem()
                .title(giveGuide.title)
                .icon(FaHandHoldingHeart)
                .child(
                  S.editor()
                    .schemaType(giveGuide.name)
                    .documentId(giveGuide.name)
                ),
              S.listItem()
                .title(joinGuide.title)
                .icon(FaRegHandshake)
                .child(
                  S.editor()
                    .schemaType(joinGuide.name)
                    .documentId(joinGuide.name)
                ),
              S.listItem()
                .title(spaceRentalGuide.title)
                .icon(GiPartyFlags)
                .child(
                  S.editor()
                    .schemaType(spaceRentalGuide.name)
                    .documentId(spaceRentalGuide.name)
                ),
            ])
        ),
      // Constituents pane
      S.listItem()
        // Give it a title
        .title("Constituents")
        .icon(IoIosPeople)
        .child(
          S.list()
            .title("Constituents")
            .items([
              // Add All People folder
              S.listItem()
                .title(pluralize(individual.title))
                .schemaType(individual.name)
                // When you open this list item, list out the documents
                // of the type "individual"
                .child(
                  S.documentTypeList(individual.name).title(
                    pluralize(individual.title)
                  )
                ),
              // Add Organizations folder
              S.listItem()
                .title(pluralize(organization.title))
                .schemaType(organization.name)
                // When you open this list item, list out the documents
                // of the type "organization"
                .child(
                  S.documentTypeList(organization.name).title(
                    pluralize(organization.title)
                  )
                ),
              // Add Household folder
              S.listItem()
                .title(pluralize(household.title))
                .schemaType(household.name)
                // When you open this list item, list out the documents
                // of the type "household"
                .child(
                  S.documentTypeList(household.name).title(
                    pluralize(household.title)
                  )
                ),

              // Divider
              S.divider(),

              // Add Board Members folder
              /*               S.listItem()
                .title(pluralize(boardMember.title))
                // This automatically gives it properties from the project type
                .schemaType(boardMember.name)
                // When you open this list item, list out the documents
                // of the type "boardMember"
                .child(
                  S.documentTypeList(boardMember.name).title(
                    pluralize(boardMember.title)
                  )
                ), */
              // Add Staff Members folder
              /*               S.listItem()
                .title(pluralize(staffMember.title))
                .schemaType(staffMember.name)
                // When you open this list item, list out the documents
                // of the type "staffMember"
                .child(
                  S.documentTypeList(staffMember.name).title(
                    pluralize(staffMember.title)
                  )
                ), */
              // Add Donors folder
              /*               S.listItem()
                .title(pluralize(donor.title))
                .schemaType(donor.name)
                // When you open this list item, list out the documents
                // of the type "donor"
                .child(
                  S.documentTypeList(donor.name).title(pluralize(donor.title))
                ), */
              // Add Sponsors folder
              /*               S.listItem()
                .title(pluralize(sponsor.title))
                .schemaType(sponsor.name)
                // When you open this list item, list out the documents
                // of the type "sponsor"
                .child(
                  S.documentTypeList(sponsor.name).title(
                    pluralize(sponsor.title)
                  )
                ), */
            ])
        ),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            ![...SINGLETON_TYPES, ...HIDDEN_TYPES].includes(listItem.getId())
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle()))),
    ]);

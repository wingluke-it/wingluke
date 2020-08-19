// S stands for structure Builder
import S from "@sanity/desk-tool/structure-builder";
import { SINGLETON_TYPES, HIDDEN_TYPES } from "../schemas/schemaGlobals";
import { FaYinYang, FaRegBuilding } from "react-icons/fa";
import { IoIosInformationCircleOutline, IoIosPeople } from "react-icons/io";
import pluralize, { plural } from "pluralize";
import museumMeta from "../schemas/singletons/museumMeta";
import facilitiesInfo from "../schemas/singletons/facilitiesInfo";
import department from "../schemas/department";
import person from "../schemas/person";
import boardMember from "../schemas/boardMember";
import staffMember from "../schemas/staffMember";
import donor from "../schemas/donor";
import sponsor from "../schemas/sponsor";
import organization from "../schemas/organization";

export default () =>
  S.list()
    .title("Wing Luke Museum Content")
    .items([
      S.listItem()
        .title("General Museum Information")
        .icon(IoIosInformationCircleOutline)
        .child(
          S.list()
            .title("General Museum Information")
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
                .title(facilitiesInfo.title)
                .icon(FaRegBuilding)
                .child(
                  S.editor()
                    .schemaType(facilitiesInfo.name)
                    .documentId(facilitiesInfo.name)
                ),
              S.listItem()
                .title(pluralize(department.title))
                .schemaType(department.name)
                .child(
                  S.documentTypeList(department.name).title(
                    pluralize(department.title)
                  )
                ),
            ])
        ),
      // Make a new list item
      S.listItem()
        // Give it a title
        .title("Constituents/People")
        .icon(IoIosPeople)
        .child(
          // Make a list in the second pane called Portfolio
          S.list()
            .title("Constituents/People")
            .items([
              // Add All People folder
              S.listItem()
                .title("All People")
                .schemaType(person.name)
                // When you open this list item, list out the documents
                // of the type "person"
                .child(S.documentTypeList(person.name).title("All People")),
              // Add Organizations folder
              S.listItem()
                .title(pluralize(organization.title))
                .schemaType(organization.name)
                // When you open this list item, list out the documents
                // of the type "person"
                .child(
                  S.documentTypeList(organization.name).title(
                    pluralize(organization.title)
                  )
                ),

              // Divider
              S.divider(),

              // Add Board Members folder
              S.listItem()
                .title(pluralize(boardMember.title))
                // This automatically gives it properties from the project type
                .schemaType(boardMember.name)
                // When you open this list item, list out the documents
                // of the type "boardMember"
                .child(
                  S.documentTypeList(boardMember.name).title(
                    pluralize(boardMember.title)
                  )
                ),
              // Add Staff Members folder
              S.listItem()
                .title(pluralize(staffMember.title))
                .schemaType(staffMember.name)
                // When you open this list item, list out the documents
                // of the type "staffMember"
                .child(
                  S.documentTypeList(staffMember.name).title(
                    pluralize(staffMember.title)
                  )
                ),
              // Add Donors folder
              S.listItem()
                .title(pluralize(donor.title))
                .schemaType(donor.name)
                // When you open this list item, list out the documents
                // of the type "donor"
                .child(
                  S.documentTypeList(donor.name).title(pluralize(donor.title))
                ),
              // Add Sponsors folder
              S.listItem()
                .title(pluralize(sponsor.title))
                .schemaType(sponsor.name)
                // When you open this list item, list out the documents
                // of the type "sponsor"
                .child(
                  S.documentTypeList(sponsor.name).title(
                    pluralize(sponsor.title)
                  )
                ),
            ])
        ),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            ![...SINGLETON_TYPES, ...HIDDEN_TYPES].includes(listItem.getId())
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle()))),
    ]);

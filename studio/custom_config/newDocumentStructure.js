import S from "@sanity/base/structure-builder";
import { SINGLETON_TYPES } from "../schemas/schemaGlobals";

export default [
  ...S.defaultInitialValueTemplateItems().filter(
    (listItem) => !SINGLETON_TYPES.includes(listItem.getId())
  ),
];

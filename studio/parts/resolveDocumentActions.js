import defaultResolve, {
  DeleteAction,
  DuplicateAction,
  UnpublishAction,
} from "part:@sanity/base/document-actions";
import { SINGLETON_TYPES } from "../schemas/schemaGlobals";

export default function resolveDocumentActions(props) {
  if (SINGLETON_TYPES.includes(props.type)) {
    return defaultResolve(props).filter(
      (Action) =>
        Action !== UnpublishAction &&
        Action !== DeleteAction &&
        Action !== DuplicateAction
    );
  }

  return defaultResolve(props);
}

// this is not called event.js because event is a special word in JS
import { REQUIRED_NAME_FIELD } from "./schemaGlobals";

export default {
  name: "program",
  title: "Program/Event", // Might be better to just stick with either "Event" or "Program"
  type: "document",
  fields: [REQUIRED_NAME_FIELD],
};

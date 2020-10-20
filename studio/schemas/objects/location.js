export default {
  name: "location",
  title: "Location",
  type: "object",
  fields: [
    {
      name: "siteName",
      title: "Site Name",
      type: "localeString",
      options: {
        collapsible: false,
      },
    },
    {
      name: "mapLocation",
      title: "Map Location",
      type: "geopoint",
    },
    {
      name: "address",
      title: "Address",
      type: "text", // TODO do addresses need to be translated?? if so make this localeText
      rows: 4,
    },
  ],
};

exports.mapEvent = raw => {
  const {
    post_date_gmt, post_modified_gmt, ID, post_status,
    post_title, guid
  } = raw;

  const mapped = {
    _meta: {
      created: post_date_gmt,
      modified: post_modified_gmt,
      legacy: { ID, post_status },
    },
    name: post_title,
    media: {
      websiteLink: guid
    }
  };

  return mapped;
};
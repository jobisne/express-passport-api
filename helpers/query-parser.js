module.exports = function (req, query) {
  let pstring = '';
  let populate = req.query.populate;
  let q = query.where(_.omit(req.query, 'populate'));
  if (populate) {
    if (Array.isArray(populate)) {
      _(populate).forEach(pop => {
        pstring = pstring.concat(` ${pop}`);
      });
    } else if ('string' === typeof populate) {
      pstring = populate;
    }
  }
  return q.populate({
    path: pstring,
    match: { isDeleted: false }
  });
};
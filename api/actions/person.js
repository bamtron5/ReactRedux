export default function person(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);

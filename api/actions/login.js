export default function login(req) {
  const user = {
    name: req.body.name
  };
  console.log(req);
  req.session.user = user;
  return Promise.resolve(user);
}

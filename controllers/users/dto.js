/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line
const single = (resource) => ({
  id: resource._id,
  name: resource.name,
  email: resource.email,
  code: resource.code,
  image: resource.image,
  phone: resource.phone,
  google: resource.google
});

const multiple = (resources) => resources.map((resource) => single(resource));

module.exports = {
  single,
  multiple,
};

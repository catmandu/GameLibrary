const bcrypt = require('bcryptjs');
const { v4: uuid4 } = require('uuid');

const IsEmptyString = value => typeof value === "string" && !value.trim() || typeof value === "undefined" || value === null;

const IsEmptyObject = value => HasValue(value) && Object.keys(value).length === 0;

const IsEmptyArray = array => HasValue(array) && array.length <= 0;

const HasValue = value => value != null && value != undefined;

const IsValidUrl = urlString =>
{
  let url;

  try
  {
    url = new URL(urlString);
  }
  catch (_)
  {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

const CreateId = () => uuid4().replace(/-/g, '');

const CreateHashedPassword = async password => 
{
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

const IsValidPassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = 
{ 
    IsEmptyString,
    IsEmptyObject,
    IsEmptyArray,
    HasValue,
    IsValidUrl,
    CreateId,
    CreateHashedPassword,
    IsValidPassword
};
const { IsEmptyString, IsEmptyArray } = require('../shared/utils');

const ShapeSingleObject = (shapeData, object) => {
  const properties = !IsEmptyString(shapeData) ? shapeData.split(',') : [];

  if (IsEmptyArray(properties)) return object;

  const tempObject = {};

  properties.forEach(property => {
    const trimmedProperty = property.trim();

    ({ [trimmedProperty]: tempObject[trimmedProperty] } = object);
  });

  return tempObject;
};

const ShapeObjectArray = (properties, objectArray) => {
  const shapedObjectArray = [];

  objectArray.forEach(currentObject => {
    shapedObjectArray.push(ShapeSingleObject(properties, currentObject));
  });

  return shapedObjectArray;
};

module.exports = {
  ShapeSingleObject,
  ShapeObjectArray
};

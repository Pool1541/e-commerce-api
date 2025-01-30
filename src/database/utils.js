const { ObjectId } = require('mongodb'); 

const isMongoId = (value) => {
  return value && typeof value === 'object' && value.$oid;
};

function cleanDocuments(documents) {
  return documents.map((doc) => {
    const processObject = (obj) => {
      if (!obj || typeof obj !== 'object') return obj;

      if (Array.isArray(obj)) {
        return obj.map((item) => processObject(item));
      }

      if (isMongoId(obj)) {
        return new ObjectId(obj.$oid);
      }

      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        newObj[key] = processObject(value);
      }
      return newObj;
    };

    return processObject(doc);
  });
}

module.exports = {
  cleanDocuments,
  isMongoId,
};

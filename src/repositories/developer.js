// read DB model
const db = require('../../models/Developer');

const GetDevelopers = async query => await db.find(query);

const GetSingleDeveloper = async query => await db.findOne(query);

const CreateDeveloper = async newDeveloper => 
{
    const dev = new db(newDeveloper);
    
    await dev.save();
    
    return dev;
};

const UpdateDeveloper = async (developerId, updatedDeveloper) => await db.findOneAndUpdate(developerId, updatedDeveloper);

const DeleteDeveloper = async developerId => await db.deleteOne(developerId);

const CountDevelopers = async () => await db.estimatedDocumentCount();

module.exports = 
{
    GetDevelopers,
    GetSingleDeveloper,
    CreateDeveloper, 
    UpdateDeveloper,
    DeleteDeveloper,
    CountDevelopers
};
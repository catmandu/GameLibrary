// read DB model
const db = require('../../models/Publisher');

const GetPublishers = async query => await db.find(query);

const GetSinglePublisher = async query => await db.findOne(query);

const CreatePublisher = async newPublisher => 
{
    const publisher = new db(newPublisher);
    
    await publisher.save(newPublisher);

    return publisher;
};

const UpdatePublisher = async (publisherId, updatedPublisher) => await db.findOneAndUpdate(publisherId, updatedPublisher);

const DeletePublisher = async deleteId => await db.deleteOne(deleteId);

const CountPublishers = async () => await db.estimatedDocumentCount();

module.exports = 
{
    GetPublishers,
    GetSinglePublisher,
    CreatePublisher,
    UpdatePublisher,
    DeletePublisher,
    CountPublishers
};
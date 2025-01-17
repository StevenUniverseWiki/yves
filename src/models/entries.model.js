// entries-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'entries';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    event: { type: String, required: true },
    user: { type: String, required: true },
    text: { type: String },
    userCount: { type: Number, required: true },
    targetUser: { type: String },
    banLength: { type: Number },
    banReason: { type: String },
    deleted: { type: Boolean },
    deletionReason: { type: String }
  }, {
    timestamps: {
      createdAt: 'timestamp'
    }
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};

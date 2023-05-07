const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'must provide name'],
            trim: true,
            maxlength: [50, 'name can not be more than 20 characters'],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
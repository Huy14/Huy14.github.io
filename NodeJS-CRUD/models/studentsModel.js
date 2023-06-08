const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must enter student name'],
  },
  age: {
    type: Number,
    required: [true, 'You must enter student age'],
  },
  math: {
    type: Number,
    required: [true, 'You must enter student math score'],
  },
  physics: {
    type: Number,
    required: [true, 'You must enter student physics score'],
  },
  chemistry: {
    type: Number,
    required: [true, 'You must enter student chemistry score'],
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

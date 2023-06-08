const Student = require('../models/studentsModel');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students', {
      data: students,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send('Cannot find any students');
  }
};

exports.deleteStudents = async (req, res) => {
  try {
    await Student.deleteMany();

    res.json({
      status: 'Success',
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Failed to delete students');
  }
};

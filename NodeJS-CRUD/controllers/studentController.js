const Student = require('../models/studentsModel');

exports.getStudentAddForm = (req, res) => {
  res.render('studentAddForm');
};

exports.getStudentEditForm = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id);
  res.render('studentEditForm', {
    data: student,
  });
};

exports.createStudent = async (req, res) => {
  try {
    await Student.create(req.body);
    console.log(req.body);
    res.redirect('/api/students/');
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Failed to add new student');
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json({
      status: 'Success',
      data: student,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send('Cannot find that student');
  }
};

exports.updateStudent = async (req, res) => {
  try {
    await Student.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect('/api/students/');
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Failed to edit student');
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findOneAndDelete({ _id: req.params.id });

    res.redirect('/api/students/');
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Failed to delete student');
  }
};

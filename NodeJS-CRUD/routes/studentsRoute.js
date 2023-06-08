const express = require('express');
const StudentsController = require('../controllers/studentsController');
const StudentController = require('../controllers/studentController');

const router = express.Router();

router
  .route('/')
  .get(StudentsController.getAllStudents)
  .post(StudentController.createStudent);

router.route('/form/add').get(StudentController.getStudentAddForm);
router.route('/form/delete/:id').get(StudentController.deleteStudent);
router
  .route('/form/edit/:id')
  .get(StudentController.getStudentEditForm)
  .post(StudentController.updateStudent);

module.exports = router;

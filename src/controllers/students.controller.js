import { StudentsList } from "../models/students/StudentsList.js";
import { Student } from "../models/students/Student.js";

const studentsList = new StudentsList();

export const getStudents = (req, res) => {
  const students = studentsList.getStudents();
  if (students.length) {
    return res.status(200).json(students);
  }
  return res.status(200).json({ message: "Não há estudantes cadastrados" });
};

export const getStudent = (req, res) => {
  const { id } = req.params;
  const student = studentsList.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  return res.send(student);
};

export const createStudent = (req, res) => {
  const { name, age } = req.body;
  const student = new Student(name, age);

  studentsList.addStudent(student);

  return res.status(201).send(student);
};

export const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const student = studentsList.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  studentsList.updateStudent(id, name, age);

  return res.send(student);
};

export const deleteStudent = (req, res) => {
  const { id } = req.params;
  const student = studentsList.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  studentsList.deleteStudent(id);

  return res.send(student);
};

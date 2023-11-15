import { StudentsRepository } from "../models/students/StudentsRepository.js";
import { Student } from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = (req, res) => {
  const students = studentsRepository.getStudents();
  if (students.length) {
    return res.status(200).json(students);
  }
  return res.status(200).json({ message: "Não há estudantes cadastrados" });
};

export const getStudent = (req, res) => {
  const { id } = req.params;
  const student = studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  return res.send(student);
};

export const createStudent = (req, res) => {
  const { name, age } = req.body;
  const student = new Student(name, age);

  studentsRepository.addStudent(student);

  return res.status(201).send(student);
};

export const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const student = studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  studentsRepository.updateStudent(id, name, age);

  return res.send(student);
};

export const deleteStudent = (req, res) => {
  const { id } = req.params;
  const student = studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  studentsRepository.deleteStudent(id);

  return res.send(student);
};

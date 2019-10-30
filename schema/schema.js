const graphql = require('graphql');
const Course = require('../models/course');
const Professor = require('../models/professor');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLSchema } = graphql;

const users = [
  {
    id: 1,
    name: 'Adrian',
    email: 'adry.dabp@gmail.com',
    password: '123',
    date: '2022'
  },
  {
    id: 2,
    name: 'Ivan',
    email: 'ivan@gmail.com',
    password: '789465',
    date: '2022'
  }
]


const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    language: {type: GraphQLString},
    date: {type: GraphQLString},
    professor: {
      type: ProfessorType,
      resolve(parent, args) {
        // return professors.find(professor => professor.id === parent.professorId)
        return Professor.findById(parent.professorId);
      }
    }
  })
});

const ProfessorType = new GraphQLObjectType({
  name: 'Professor',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    active: {type: GraphQLBoolean},
    date: {type: GraphQLString},
    course: {
      type: GraphQLList(CourseType),
      resolve(parent, args) {
        // return courses.filter(course => course.professorId === parent.id)
        return Course.find({ professorId: args.id})
      }
    }
  })
});

const UserType =  new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    date: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    course: {
      type: CourseType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return courses.find(item => item.id === args.id);
        return Course.findById(args.id)
      }
    },
    courses: {
      type: GraphQLList(CourseType),
      resolve(parent, args) {
        // return courses
        return Course.find()
      }
    },
    professor: {
      type: ProfessorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return professors.find(professor => professor.name === args.name);
        return Professor.findById(args.id)
      }
    },
    professors: {
      type: GraphQLList(ProfessorType),
      resolve(parent, args) {
        // return professors
        return Professor.find()
      }
    },
    user: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return users.find(user => user.email === args.email);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCourse: {
      type: CourseType,
      args: {
        name: {type: GraphQLString},
        language: {type: GraphQLString},
        date: {type: GraphQLString},
        professorId: {type: GraphQLID}
      },
      resolve(parent, args) {
        let course = new Course({
          name: args.name,
          language: args.language,
          date: args.date,
          professorId: args.professorId
        });
        return course.save();
      }
    },
    addProfessor: {
      type: ProfessorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        active: {type: GraphQLBoolean},
        date: {type: GraphQLString}
      },
      resolve (ṕarent, args) {
        let professor = new Professor(args);
        return professor.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
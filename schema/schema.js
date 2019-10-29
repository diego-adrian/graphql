const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLSchema } = graphql;

const courses = [
  {
    id: '1',
    name: 'Como usar Babel',
    language: 'Javascript',
    date: '2019',
    professorId: 2
  },
  {
    id: '2',
    name: 'Programacion orientada a Objetos',
    language: 'Java',
    date: '2020',
    professorId: 1
  },
  {
    id: '3',
    name: 'Algoritmos Geneticos',
    language: 'Java',
    date: '2021',
    professorId: 1
  }
];

const professors = [
  {
    id: 1,
    name: 'Adrian',
    age: 27,
    active: true,
    date: '2022'
  },
  {
    id: 2,
    name: 'Marcelo',
    age: 30,
    active: true,
    date: '2022'
  },
  {
    id: 3,
    name: 'Ivan',
    age: 24,
    active: false,
    date: '2022'
  }
];

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
        return professors.find(professor => professor.id === parent.professorId)       
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
        return courses.filter(course => course.professorId === parent.id)
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
        return courses.find(item => item.id === args.id);
      }
    },
    courses: {
      type: GraphQLList(CourseType),
      resolve(parent, args) {
        return courses
      }
    },
    professor: {
      type: ProfessorType,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return professors.find(professor => professor.name === args.name);
      }
    },
    professors: {
      type: GraphQLList(ProfessorType),
      resolve(parent, args) {
        return professors
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

module.exports = new GraphQLSchema({
  query: RootQuery
});
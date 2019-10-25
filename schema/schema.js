const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const courses = [
  {
    id: '1',
    name: 'Como usar Babel',
    language: 'Javascript',
    date: '2019'
  },
  {
    id: '2',
    name: 'Programacion orientada a Objetos',
    language: 'Java',
    date: '2020'
  },
  {
    id: '3',
    name: 'Algoritmos geneticps',
    language: 'Java',
    date: '2021'
  }
]

const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    language: {type: GraphQLString},
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
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return courses.find(item => item.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
export const typeDefs = `
    type User{
        name: String!
        lastName: String!
        email: String!
        password: String
        id: ID
        createAt: String
    }
    type Author{
        name: String!
        lastName: String!
        country: String!
        createAt: String
    }

    type Book{
        title: String!
        editorial: String!
        opinions: String!
        author: String!
        createAt: String
        user: String!
        
    }

    type ShowBook{
        title: String
        editorial: String
        opinions: String
        author: Author
    }

    input BookInput{
        title: String!
        editorial: String!
        opinions: String!
        createAt: String
        authorName: String!
        authorLastName: String!
        authorCountry: String
    }

    input NewUserInput{
        name: String!
        lastName: String!
        email: String!
        password: String!
        createdAt: String
    }

    input BookInputUpdate{
        title: String
        editorial: String
        opinions: String
    }

    type Query{
        showBooks: [Book!]
        showAuthor(name: String): Author
    }

    type Mutation{
        createNewUser(userInput: NewUserInput): User!
        createNewBook(title: String editorial: String opinions: String authorName: String authorLastName: String authorCountry: String userName: String): Book!
        updateBook(bookInput: BookInputUpdate): Book!
        deleteBook(bookInput: ID): Book!
        loginUser(email: String password: String): User!
    }

   

`


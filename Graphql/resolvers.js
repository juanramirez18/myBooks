import Book from "../models/bookSchema.js";
import Author from "../models/authorSchema.js";
import User from "../models/userSchema.js"
import bcrypt from "bcrypt"

export const resolvers = {
    Query:{
        showBooks: async(root, args)=> {
            console.log("Desde showbooks backend")
            const booksList = await Book.find()
            console.log(booksList)
            return booksList
            // console.log("desde showBokks")
            // try {
            //     const res = await Book.findOne({title:args.title}).populate("author");
            //     if(!res){
            //         console.log("Book no found!")
            //     }
            //     console.log(res)
            //     return res
                
            // } catch (error) {
            //     console.log(error)    
            // }
     
        },
        showAuthor: async(root, args)=>{
            console.log(args)
            
            try{
                const authorFind = await Author.findOne({name: args.name}).populate("books")
                console.log(authorFind)
                if(!authorFind){
                    console.log("Author no encontrado")
                }


            }catch(error){
                console.log(error)
            }
        }

    },
    Mutation:{
        createNewBook: async(root, {title, editorial, opinions, authorName, authorLastName, authorCountry, userName}) => {
            console.log("desde create book", userName)
            const findUser = await User.findOne({name: userName})
            if(findUser){
                console.log(findUser._id)
                
            }
            try {
                const findAuthor = await Author.findOne({name: authorName})
                console.log("desde try", findAuthor)
                if(!findAuthor){
                    const newAuthor = new Author({
                        name: authorName, 
                        lastName: authorLastName,
                        country: authorCountry,
                        createAt: new Date().toISOString()
                    });
                    const resAuthor = await newAuthor.save()
                    console.log("Despues de guardar", resAuthor)
                    const newBook = new Book({
                        title,
                        editorial,
                        opinions,
                        createAt: new Date().toISOString(),
                        author: resAuthor._id,
                        userName: findUser._id
                    })
                    const resBook = await newBook.save()
                    resAuthor.books = resAuthor.books.concat(resBook._id)
                    findUser.books = findUser.books.concat(resBook._id)
                    await resAuthor.save()
                    await findUser.save()
                    console.log("-> Despues de concatenar book_id", findUser)
                    return resAuthor

                }
                const book = new Book({
                    title,
                    editorial,
                    opinions,
                    author: findAuthor._id,
                    createdAt: new Date().toISOString(),
                    userName: findUser._id
                })
                console.log("El autor existe")
                const resBook = await book.save()
                findAuthor.books = findAuthor.books.concat(resBook._id)
                findUser.books = findUser.books.concat(resBook._id)
                await findAuthor.save()
                await findUser.save()
                console.log(findAuthor)
                return findAuthor
                
            } catch (error) {
                console.log(error)
            }
            
        },
        updateBook:async(_, args) =>{
            const {title, opinions, editorial} = args.bookInput
            try{
                const modifyBook = {
                    title,
                    opinions, 
                    editorial
                }
                const findBook = await Book.findOneAndUpdate({title}, modifyBook)
                if(!findBook){
                    console.log("Book no found!")
                }
                console.log("Update items", findBook)
                return


            }catch (error){
                console.log(error)

            }

        },
        deleteBook: async(_, args)=>{
            const {_id} = args.bookInput
            console.log("desde deleteBook", args)
            try{
                const delBook = await Book.findOneAndDelete({_id: args.bookInput})
                console.log(delBook)
                return delBook

            }catch (error){
                console.log(error)
            }
        },
        createNewUser: async(root, args)=>{
            class userError extends Error{}
            const {name, lastName, email, password} = args.userInput
            if(name === "" || lastName === "" || email === "" || password === "") throw new userError("Campos obligatorios")
                
            

            const findUser = await User.findOne({email})
            
            if(!findUser){
                const hashPassword = await bcrypt.hash(password, 8)
                try {
                    const newUser = new User({
                        name,
                        lastName,
                        email,
                        password : hashPassword,
                        createdAt: new Date().toISOString()
                        
                })
                    await newUser.save()
                    console.log(newUser)
                    return newUser
                    
                    
                } catch (error) {
                    console.log(error)
                }
            }else if(findUser) throw new userError("Usuario existente")

            

        },
        
        loginUser : async(_, {email, password}) => {
            const findUser = await User.findOne({email})
            if(!findUser) throw new Error("Usuario no existe")
            const validate = await bcrypt.compare(password, findUser.password)
            if(!validate) throw new Error("Contraseña no valida")
            return findUser

            
        }


    }


}
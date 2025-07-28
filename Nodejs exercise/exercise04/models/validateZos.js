import z from "zod"

// create user shema zod
 export const createUserZod = z.object({
   name:z.string().min(5,"name is requred and minimum 5 chracter"),
   username:z.string().min(5,"username is requred and minimum is 5 string"),
   email:z.string().email("email is reuired"),
   password:z.string().min(6,"Password must be 6 chracters")
})

// user login zod
export const loginZod = z.object({
  username:z.string().min(5,"Username must greather then 5 chracters"),
  password:z.string().min(6,"Password must be minimum 6 chracters")
})




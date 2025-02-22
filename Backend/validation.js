const zod=require('zod');

const userschema=zod.object({
    username:zod.string().email(),
    firstname:zod.string().min(1),
    lastname:zod.string().min(1),
    password:zod.string().max(8)
})

const signinschema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(1)
})

module.exports={
    userschema,
    signinschema
}
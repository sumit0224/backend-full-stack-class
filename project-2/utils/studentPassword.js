
const studentPassword = (fullName)=>{
    const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%%^&*()_+{}:<>?"
    let pass = ""
    const len = fullName.length >= 8 ? fullName.length : 8
    for(let i = 0; i< len; i++){
        const rand = Math.floor(Math.random()* char.length)
        pass += char[rand]
    }
    return pass
}

export default studentPassword
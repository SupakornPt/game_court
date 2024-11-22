const registerValidator = (userName,email,password,conFirmPassword) => {

if(!userName){
    return {message:"Username is required.",
        status:400
    }
}
if(!email){
    return {message:"Email is required.",status:400}
}
if(!email.includes("@")){
    return {message:"Email must contain @ symbol",status:400}
}
const partsEmail = email.split('@');

if(partsEmail.length !== 2) {
    return {message:"Email must contain only one @ symbol",status:400}
}
const [localPart, domainPart] = partsEmail;

if (localPart.length === 0) {
        return { valid: false, message: "Email must have characters before '@'." ,status:400};
}

if (!domainPart.includes('.')) {
        return { valid: false, message: "Domain part must contain a '.' (dot)." ,status:400};
}

if(!password){
    return {message:"Password is required.",status:400}
} 
if(!conFirmPassword){
    return {message:"Confirm password is required.",status:400}
}
if(password!==conFirmPassword){
    return {message:"Please type password and confirm password are same values.",status:400}
}     
}
module.exports = registerValidator;
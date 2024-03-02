const valiDateEmails = (email)=>{

    if(!email.includes('@gmail.com')) return false;

    return true
}
export default  valiDateEmails
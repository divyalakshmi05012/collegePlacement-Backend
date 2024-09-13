export const randString=(n)=>{
    let charSet='qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
    let string=''
    for (let i=0;i<n;i++)
    {
        string += charSet[(Math.floor(Math.random()*100)%62)]
    }
    return string
}
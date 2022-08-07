let form = document.forms['form'] as HTMLFormElement
let body = document.querySelector('#table');

form.btnAdd.onclick = (e) => {
    e.preventDefault()
    addUser()
}
form.editBtn.onclick = () => editUser()

let users = [];
let user = {}
let userIndex;

let addUser = () => {
    user = {
        login: form.login.value,
        password: form.password.value,
        email: form.email.value,
    }
    users.push(user)
    form.reset();
    render()
}
const render = () => {
    body.innerHTML = '';
    users.forEach((u, ind) => {
        body.innerHTML += `
    <tr> 
       <td class="column">${ind + 1}</td>
       <td class="column">${u.login}</td>
       <td class="column">${u.password}</td>
       <td class="column">${u.email}</td>
       <td class="column"><input class="btnEdit" type="button" value="Edit"></td>
       <td class="column"><input class="btnDel" type="button" value="Delete"></td>
    </tr>
    `
        document.querySelectorAll('.btnDel').forEach((del, index) => {
            // @ts-ignore
            del.onclick = () => {
                users = users.filter((_, idx) => index !== idx);
                render();
            }
        })
        document.querySelectorAll('.btnEdit').forEach((ed, i) => {
            // @ts-ignore
            ed.onclick = () => {
                form.login.value = users[i].login
                form.password.value = users[i].password
                form.email.value = users[i].email
                form.btnAdd.style.display = 'none'
                form.editBtn.style.display = 'block'
                userIndex = i;
            }
        })
    })
}
 const editUser =()=>{
     class newUser {
         constructor(public login: string, public password: string, public email: string) {
         }
     }
     user = new newUser(form.login.value, form.password.value, form.email.value)
     users.splice(userIndex, 1, user)
     render()
     form.reset()
     form.btnAdd.style.display = 'block'
     form.editBtn.style.display = 'none'
 }
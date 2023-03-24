import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme } from '@mui/material/styles';
import { withRouter, useHistory } from 'react-router-dom';
import { deleteAPI, getAPI, postAPI, putAPI } from '../service';



const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 2px brown'
    },
};
function Userdashboard() {
    const [userAddModelisopen, setuserAddModelisopen] = useState(false);
    const [userUpdateModelisopen, setuserUpdateModelisopen] = useState(false);
    const [userList, setuserList] = useState();
    const [currentpage, setCurrentpage] = useState(0);
    console.log(currentpage);
    const increment = () => {
        setCurrentpage(Next => Next + 1)
        getUser()
    }
    const decrement = () => {
        setCurrentpage(Prev => Prev - 1)
        getUser()
    }
    
    const [Nextpage, setNextpage] = useState(false);
    // const [prevpage, setPrevpage] = useState();
    const [Adduser, setUser] = useState({
        firstname: '',
        lastname: '',
        department: '',
        email: '',
        country: '',
        Userimage: '',
    });
    var [updateuser, setupdateUser] = useState({
        Firstname: '',
        Lastname: '',
        Department: '',
        Email: '',
        Country: '',
        Userimage: '',
    });
    const [selecteduser, setselectuser] = useState('')
   

    console.log('hit')
    useEffect(() => {
        if (!userList) {
            getUser()
        }
    },[])

    function getUser() {
            postAPI('user/pagination',{page:currentpage}).then(res => {
                console.log(res)
                if (res && !res.error) {
                    setuserList(res.data.userpages)
                    setNextpage(res.data.nextPage)
                    //setCurrentpage(res.data.currentPage)
                    console.log(res.data.nextPage);
                } else {
                    alert(res ? res.message : 'Something went wrong')
                }
            });
        }
        
    
    function userDelete(id) {

        // eslint-disable-next-line no-restricted-globals
        let check = confirm('Are you sure you want to delete?')
        if (check) {
            deleteAPI(`user/Deleteuser/${id}`).then((res) => {
                if (res && !res.error) {
                    alert(res.message);
                    getUser()
                } else {
                    alert(res ? res.message : 'Something went wrong')
                }
            })
        }
    }

    //(Base64)to converting file or photo to text
    function convertBase64 (file,type) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            console.log(fileReader.result);
           
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
        .then(files => {
            console.log(files);
            if(type == 'Add'){
                setUser(previous => ({
                    
                    ...previous,
                    Userimage: files
                }))
            }
            else{
                setupdateUser(previous => ({
                    
                    ...previous,
                    Userimage: files
                }))
            }
          
            console.log(Adduser);
        })
      }

    function userUpdate(data) {
      
        switch (data.target.id) {
            case 'firstname':
                setUser(previous => ({
                    ...previous,
                    firstname: data.target.value
                }))
                console.log(Adduser);
                break;

                //for representing file type value
                case 'Userimage':
                console.log(data.target.files);
                convertBase64(data.target.files[0],'Add')
                break;

            case 'lastname':
                setUser(previous => ({
                    ...previous,
                    lastname: data.target.value
                }))
                break;

            case 'department':
                setUser(previous => ({
                    ...previous,
                    department: data.target.value
                }))
                break;

            case 'email':
                setUser(previous => ({
                    ...previous,
                    email: data.target.value
                }))
                break;

            case 'country':
                setUser(previous => ({
                    ...previous,
                    country: data.target.value
                }))
                break;
        }
    }
    function Additemuser() {
        let item = { Adduser }
        console.log(item)
        postAPI(`user/Adduser`, item.Adduser).then((res) => {
            if (res && !res.error) {
                alert(res.message);
                getUser()
            } else {
                alert(res ? res.message : 'Something went wrong')

            }
        })
    }

    function userdashUpdate(data) {
        switch (data.target.id) {
            case 'Firstname':
                setupdateUser(previous => ({
                    ...previous,
                    Firstname: data.target.value
                }))
                break;

                case 'Userimage':
                    console.log(data.target.files);
                    convertBase64(data.target.files[0],'Update')
                    break;

            case 'Lastname':
                setupdateUser(previous => ({
                    ...previous,
                    Lastname: data.target.value
                }))
                break;

            case 'Department':
                setupdateUser(previous => ({
                    ...previous,
                    Department: data.target.value
                }))
                break;

            case 'Email':
                setupdateUser(previous => ({
                    ...previous,
                    Email: data.target.value
                }))
                break;

            case 'Country':
                setupdateUser(previous => ({
                    ...previous,
                    Country: data.target.value
                }))
                break;
        }
    }

    function Edituser(id) {
        let updateitem = { updateuser }
        console.log(updateitem)
        putAPI(`user/Edituser/${id}`, updateitem.updateuser).then((res) => {
            if (res && !res.error) {
                alert(res.message)
                setuserUpdateModelisopen(false)
                getUser()
            } else {
                alert(res ? res.message : 'Something went wrong')
            }
        })
    }

    const history = useHistory();
    function selectDetailspage(data) {
        history.push({
            pathname: (`/details`)
        })


    }

    function enableEdit(user) {
        setuserUpdateModelisopen(true);
        setselectuser(user.id);
    }

    return (
        <div>
            <nav class="navbar navbar-light bg-dark justify-content-between">
                <a class="navbar-brand" href='#' style={{ color: 'white' }}>Home</a>
            </nav>
            <br />
           
            <table class="table">
                <thead>
                    <tr>
                        <tr colspan="4">
                            <Button variant="outlined" onClick={() => { setuserAddModelisopen(true) }} startIcon={<PersonIcon />}>
                                New Friend
                            </Button>
                        </tr>
                    </tr>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Profile Photo</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Department</th>
                        <th scope="col">Email</th>
                        <th scope="col">Country</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <br />
                <tbody>
                    {
                        userList?.map((user, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={user.Userimage} style={{width:'100px'}} /></td>
                                    {/* <td>{user.Userimage}</td> */}
                                    <td>{user.Firstname}</td>
                                    <td>{user.Lastname}</td>
                                    <td>{user.Department}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Country}</td>
                                    <td><Button color="secondary" onClick={() => selectDetailspage(user.id)}>Details</Button>
                                        <Button variant="contained" color="success" onClick={() => { enableEdit(user) }}>
                                            Edit
                                        </Button>

                                        <Button variant="outlined" color="error" onClick={() => { userDelete(user.id) }}>
                                            Delete
                                        </Button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                    <Button disabled={currentpage>0 ? false : true} onClick={() => decrement()}>Prev{currentpage}</Button>
                    </li>
                   
                    <li class="page-item">
                        
                        <Button disabled={!Nextpage} onClick={() => increment()}>Next{Nextpage}</Button>
                    </li>
                </ul>
            </nav>
            <Modal
                isOpen={userAddModelisopen}
                style={customStyles}
                ariaHideApp={false}
            >
                <form>
                    <h1>Add user data</h1>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Firstname</label>
                        <input type="text" class="form-control" onChange={(e) => userUpdate(e)} id="firstname" aria-describedby="emailHelp" placeholder="Firstname" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Lastname</label>
                        <input type="text" class="form-control" onChange={(e) => userUpdate(e)} id="lastname" placeholder="Lastname" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">dept</label>
                        <input type="text" class="form-control" onChange={(e) => userUpdate(e)} id="department" placeholder="dept" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">gmail</label>
                        <input type="email" class="form-control" onChange={(e) => userUpdate(e)} id="email" placeholder="gmail" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">country</label>
                        <input type="text" class="form-control" onChange={(e) => userUpdate(e)} id="country" placeholder="country" />
                    </div>
                    <br />

                    <div className='form-group'>
                        <label htmlFor='file'>Choose File</label>
                        <input type='file'
                        id='Userimage'
                        className='form-control-file'
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => userUpdate(e)} />
                    </div>




                    <button type="submit" class="btn btn-primary" onClick={() => Additemuser()}>Submit</button>

                </form>
                <br />
                <Button variant="outlined" onClick={() => { setuserAddModelisopen(false) }} startIcon={<PersonIcon />}>
                    Cancel
                </Button>
            </Modal>
            <Modal
                isOpen={userUpdateModelisopen}
                style={customStyles}
                ariaHideApp={false}
            >
                <form>
                    <h1>Update user data</h1>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Firstname</label>
                        <input type="text" class="form-control" onChange={(e) => userdashUpdate(e)} id="Firstname" aria-describedby="emailHelp" placeholder="Firstname" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Lastname</label>
                        <input type="text" class="form-control" onChange={(e) => userdashUpdate(e)} id="Lastname" placeholder="Lastname" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">dept</label>
                        <input type="text" class="form-control" onChange={(e) => userdashUpdate(e)} id="Department" placeholder="dept" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">gmail</label>
                        <input type="email" class="form-control" onChange={(e) => userdashUpdate(e)} id="Email" placeholder="gmail" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">country</label>
                        <input type="text" class="form-control" onChange={(e) => userdashUpdate(e)} id="Country" placeholder="country" />
                    </div>
                    <br />

                    <div className='form-group'>
                        <label htmlFor='file'>Choose File</label>
                        <input type='file'
                        id='Userimage'
                        className='form-control-file'
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => userdashUpdate(e)} />
                    </div>


                    <Button style={theme} color='success' onClick={() => { Edituser(selecteduser) }}>update</Button>



                </form>


                <Button variant="outlined" onClick={() => { setuserUpdateModelisopen(false) }} startIcon={<PersonIcon />}>
                    Cancel
                </Button>

            </Modal>
        </div>
    )
}
export default withRouter(Userdashboard);
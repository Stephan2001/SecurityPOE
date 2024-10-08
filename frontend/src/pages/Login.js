import { useState  } from "react"
const Login = () =>{
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const{login, isLoading, error} = userLogin()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log(email, password)
        await login(email, password)
    }
}


    return(
        <form className="login" onSubmit={handleSubmit}>

            <h3>Add new book</h3>
            <label>email:</label>
            <input type='email' 
                onChange={(e) => setTitle(e.target.value)}
                value={email}>
            </input>

            <label>Book Author:</label>
                <input type='passowrd' 
                onChange={(e) => setEmail(e.target.value)}
                value={passowrd}>
            </input>
            
            <label>Book Quentity:</label>
            <input type='number' 
                onChange={(e) => setPassword(e.target.value)}
                value={quantity}>
            </input>

            <button>Add Book</button>
        </form>
    )

}

export default BookForm
import{useState} from 'react'
const BookForm = () => {
    const[title, setTitle] = useState('')
    const[author, setAuthor] = useState('')
    const[quantity, setQuantity] = useState('')
    const[error, setError] = useState(null)


    const handleSubmit = async(e) =>{
        e.preventDefault() // deafualt actions is to refesh the page on submit, we do not want this

        const book = {title, author, quantity}

        const response = await fetch('api/books', {
            method:'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setAuthor('')
            setQuantity('')
            setError(null)
            console.log("New book added", json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>

            <h3>Add new book</h3>
            <label>Book Title:</label>
            <input type='text' 
                onChange={(e) => setTitle(e.target.value)}
                value={title}>
            </input>

            <label>Book Author:</label>
                <input type='text' 
                onChange={(e) => setAuthor(e.target.value)}
                value={author}>
            </input>
            
            <label>Book Quentity:</label>
            <input type='number' 
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}>
            </input>

            <button>Add Book</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )

}

export default BookForm
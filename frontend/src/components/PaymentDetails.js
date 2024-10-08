const handleClick = (payment) =>{
    
}
const PaymentDetails = ({payment}) => {
    return(
        <div className="payment-details">
            <h4>{payment.amount}</h4>
            <p><strong>Amount: </strong>{payment.currency}</p>
            <p><strong>Provider: </strong>{payment.provider}</p>
            <p>{payment.createdAt}</p>
            <span onClick={handleClick}>payment</span>
        </div>
    )
}

export default PaymentDetails
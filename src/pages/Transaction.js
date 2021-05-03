import { useParams } from "react-router-dom";

const Transaction = () => {
    const { id } = useParams();
    return(
        <h1>Edit your transaction #{id}</h1>
    )
}

export default Transaction;
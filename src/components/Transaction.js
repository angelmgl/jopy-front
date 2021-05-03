import { format } from "timeago.js";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Transaction = ({
    id,
    ammount,
    type,
    spends_category,
    income_category,
    created_at,
}) => (
    <div className={`transaction ${type}`}>
        {type === "income" ? (
            <p className="category">{income_category}</p>
        ) : (
            <p className="category">{spends_category}</p>
        )}
        <p>{format(created_at, "en-US")}</p>
        <p className="ammount">
            {type === "income" ? `+${ammount} $` : `-${ammount} $`}
            <Link to={`/transaction/${id}`}>
                <FaEdit className="edit-icon" />
            </Link>
        </p>
    </div>
);

export default Transaction;

import { format } from 'timeago.js';

const Transaction = ({ id, ammount, type, spends_category, income_category, created_at }) => (
    <div className={`transaction ${type}`}>
        {
            type === "income" 
            ? (<p className="category">{income_category}</p>)
            : (<p className="category">{spends_category}</p>)
        }
        <p>{format(created_at, 'en-US')}</p>
        <p className="ammount">{
            type === "income"
            ? (`+${ammount} $`)
            : (`-${ammount} $`)
        }</p>
    </div>
);

export default Transaction;
import { currencyFormatter } from "../util/formatting";

export default function CartItme({name, count, price, onIncrease, onDecrease}){
    return <li className="cart-item">
        <p>
            {name} - {count} X {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{count}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}
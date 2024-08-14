export default function Input({Label, Id, error, ...props}){
    return(
        <div className="control no-margin">
            <label htmlFor={Id}>{Label}</label>
            <input id={Id}
                {...props}
            />
            <div className="control-error">{error && <p>Please check validation</p>}</div>
        </div>
    )
}
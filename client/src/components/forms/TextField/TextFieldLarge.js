export const TextFieldLarge = (props)=>{
    const {label, type,  placeholder, name, values,formError, handleChange, showError } = props;
    return(
        <div className="mb-7">
            <label  htmlFor={label}
                    className="block mb-2 text-sm font-medium ">
                {label}
            </label>
            <input id={label}
                   className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 tablet:w-96 w-64 p-2.5"
                   type={type}
                   placeholder={placeholder}
                   name={name}
                   onChange={handleChange}
                   value={values}
            />
            {formError && showError && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{formError}</p>}
        </div>
    );
}
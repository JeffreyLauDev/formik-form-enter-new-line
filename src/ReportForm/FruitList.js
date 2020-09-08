import React from 'react';
import { Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';



function FruitList(props) {
    const { values, setFieldValue } = props;
    return (
        <>
            <FieldArray
                name="fruits"
                render={arrayHelpers => (
                    <div>

                        {values.fruits && values.fruits.length > 0 ? (
                            values.fruits.map((fruit, index) => (
                                <div key={index}>

                                    <Field
                                        id={`fruits.${index}.name`}
                                        component={TextField}
                                        name={`fruits.${index}.name`}
                                        type="text"
                                        label="Fruit name"
                                        onPaste={e => {
                                            e.preventDefault();
                                            const arr = e.clipboardData.getData('Text').split("\n");
                                            arr.map((newline, idx) => {
                                                return arrayHelpers.insert(index, { name: arr[arr.length - idx - 1] });
                                                
                                            })
                                            setFieldValue(`fruits.${index}.name`, arr[0]);

                                        }}
                                        onKeyPress={(e) => {
                                          
                                            const nextField = document.getElementById(`fruits.${index + 1}.name`);
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if(nextField ===null){
                                                    //Create a field if it is the last field
                                                    arrayHelpers.insert(index + 1, { name: "" });
                                                }

                                            }
                                        }}
                                        onKeyUp={(e) => {
                                            const nextField = document.getElementById(`fruits.${index + 1}.name`);
                                            const prevField = document.getElementById(`fruits.${index - 1}.name`);
                                            if (e.key === 'Enter') {
                                                //Focus to the next field everytime to enter key is clicked
                                                nextField.focus();
                                            }

                                            if (e.key === "Backspace" && fruit.name === "" && index !== 0) {
                                                prevField.focus();
                                                arrayHelpers.remove(index);
                                            }
                                        }}

                                    />
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)} // remove a fruit from the list
                                    >
                                        -
                                        </button>
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.insert(index + 1, { name: "" })} // insert an empty string at a position
                                    >
                                        +
                                 </button>
                                </div>
                            ))
                        ) : (
                                <button type="button" onClick={() => arrayHelpers.push({ name: "" })}>
                                    {/* show this when user has removed all fruits from the list */}
                     Add a fruit
                                </button>
                            )}

                    </div>
                )}
            />
        </>
    )
}


export default FruitList;
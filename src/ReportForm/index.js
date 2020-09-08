import * as React from 'react';
import { Formik, Form } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import FruitList from './FruitList';


// function CheckUserExist(name, platform) {
//     return new Promise(function (resolve, reject) {
//         // do a thing, possibly async, then…
//         if (name !== "jeffrey") {
//             resolve("Stuff worked!");
//         }
//         else {
//             reject(Error("It broke"));
//         }
//     });
// }
function ReportForm() {
    return (
        <>
            <Formik
                initialValues={{
                    platform: '',
                    fruits: [
                        {name:""},
                        
                    ],
                }}
                validate={values => {
        
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting,values,setFieldValue }) => (
                    <Form>
                        <FruitList values={values} setFieldValue={setFieldValue}/>
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
              </Button>
                    </Form>
                )}
            </Formik>

        </>
    );
}

export default ReportForm;

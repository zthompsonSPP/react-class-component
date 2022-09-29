import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';


export default function DebounceButton({ buttonText, processingText, isDisabled, variant, color, clickFxn, debounceInterval}) {
    // Define 2 state variables:
    // One to determine if the button is disabled from the parent component
    // And one for determining if the clickFxn is processing
    const [disabled, setDisabled] = useState(isDisabled)
    const [processing, setProcessing] = useState(false);

    // Create a promise that delays running the onClick function from the props 
    // for the debounceInterval time and resolves with a false response
    // to end the processing phase
    const handleClick = () => {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                clickFxn();
                resolve(false)
            } , parseInt(debounceInterval));
        })
    }

    // This determines if the button is disabled or enabled from the parent component 
    // and updates the "disabled" state accordingly
    useEffect(() => {
        setDisabled(isDisabled)
    }, [isDisabled]);


    // This runs every time the processing state is updated
    useEffect(() => {
        // Declare an async data function that runs the handleClick function
        // and sets the disabled and processing state to the results
        const fetchData = async () => {
            const data = await handleClick();
      
            setProcessing(data)
            setDisabled(data)
        }
      
        // Call the fetchData function if the processing state is true
        if(processing){
            fetchData()
                // make sure to catch any error
                .catch(console.error);;
        }

      }, [processing])
    

    // Create a button that sets the disabled and processing states to true onClick
    // to trigger the handleClick promise function
    return (
        <div>
            <Button
                variant={variant}
                color={color}
                onClick={() => {
                    setProcessing(true)
                    setDisabled(true)
                }}
                disabled={disabled}
            >
                <React.Fragment>
                    {processing ? <CircularProgress size={16} /> : null}
                    {processing ? processingText: buttonText}
                </React.Fragment>
            </Button>
        </div>
    )
}

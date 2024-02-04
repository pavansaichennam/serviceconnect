// import { React } from 'react';

import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const StepHeaderInformation = (props) => {
    const msg = [
        {
            head: 'Service selection',
            desc: 'Please select the service you would like.'
        },
        {
            head: 'Service Catalog',
            desc: 'Select a service category and choose your Service Provider'
        },
        {
            head: 'Selected Service',
            desc: 'This is your selected service'
        },
        {
            head: 'Confirm Booking',
            desc: 'Please confirm your selected service details your estimated cost is below.'
        },
        {
            head: 'Your booking is confirmed',
            desc: 'You should receive a confirmation email shortly'
        },
    ]
    return (
        <Box mt={5} >
            <Typography variant="h4" gutterBottom>
                Step {props.step==4 ? props.step :props.step + 1}: {msg[props.step].head}
            </Typography>
            <Typography variant="body2" gutterBottom>
                {msg[props.step].desc}
            </Typography>
        </Box>
    )
}

export default StepHeaderInformation;
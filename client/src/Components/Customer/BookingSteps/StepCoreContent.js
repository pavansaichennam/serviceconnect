// import { React } from 'react';

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import StepOneImageListBlock from "../BookingSteps/StepOneImageListBlock/StepOneImageListBlock";
import Step3 from "../BookingSteps/Step3/Step3";
import Step4 from "../BookingSteps/Step4/Step4";
import Step5 from "../BookingSteps/Step5/Step5";
import ServiceCatalog from "../BookingSteps/ServiceCatalog/ServiceCatalog";

const StepCoreContent = (props) => {
  const step = props.step;
  const setSelectedService = props.setSelectedService;
  const setserviceTypeSelected = props.setserviceTypeSelected;
  const selectedService = props.selectedService;
  const serviceTypeSelected = props.serviceTypeSelected;
  let component;
  switch (step + 1) {
    case 1:
      component = (
        <StepOneImageListBlock
        setSelectedService={setSelectedService}
        selectedService={selectedService}
        />
      );
      break;
    case 2:
      component = (
        <DroneCatelog
        selectedService={selectedService}
        setserviceTypeSelected={setserviceTypeSelected}
          handleDateRange={props.handleDateRange}
        />
      );
      break;
    case 3:
      component = (
        <Step3
          selectedService={selectedService}
          serviceTypeSelected={serviceTypeSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    case 4:
      component = (
        <Step4
          selectedService={selectedService}
          serviceTypeSelected={serviceTypeSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    case 5:
      component = (
        <Step5
          selectedService={selectedService}
          serviceTypeSelected={serviceTypeSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    default:
      break;
  }
  return (
    <Box mt={2}>
      {component}
      {selectedService && (
        <Typography sx={{ mt: 1 }}>
          {" "}
          Selected Service: {selectedService.title}{" "}
        </Typography>
      )}
    </Box>
  );
};

export default StepCoreContent;

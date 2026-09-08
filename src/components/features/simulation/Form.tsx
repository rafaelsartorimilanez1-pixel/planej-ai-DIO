import { FormStep } from "@/components/features/simulation/FormStep";
import { Progress } from "@/components/features/simulation/Progress";
import type { SimulationFormData } from "@/data/simulation";
import { simulationFormSteps } from "@/data/simulation";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SimulationForm() {
    const {saveFormData} = useSimulationStorage()
    const navigate = useNavigate()
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData)
    const totalSteps = simulationFormSteps.length
    const currentStep = simulationFormSteps[currentStepIndex]

const handleNextStep = (value: string) => {
    const updatedFormData = {
        ...formData,
        [currentStep.id]: value,
    }

    setFormData(updatedFormData)

    const isLastStep = currentStepIndex === totalSteps - 1

    if (isLastStep) {
        const id = saveFormData(updatedFormData)

        navigate(`/resultado/${id}`)
        return
    }

    setCurrentStepIndex((prev) => prev + 1)
}

    const handlePreviousStep = () => {
        if(currentStepIndex === 0){
            return
        }

        setCurrentStepIndex((prev) => prev - 1)
    }

    return(
        <>
            <Progress currentStep={currentStepIndex +1} totalSteps={totalSteps} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
                onBack={handlePreviousStep}
                onNext={handleNextStep}
                hideBackButton={currentStepIndex === 0}
            />
        </>
    )
}

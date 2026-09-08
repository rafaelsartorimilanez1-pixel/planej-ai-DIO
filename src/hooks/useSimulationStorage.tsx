import type { SimulationFormData, SimulationRecord } from "@/data/simulation";

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {

    const saveFormData = (formData: SimulationFormData, monthlySavings: string) => {

        const id = crypto.randomUUID()

        const record: SimulationRecord = {
            ...formData,
            id,
            date: new Date().toLocaleDateString('pt-BR'),
            goalMonthlySavings: monthlySavings,
        }

        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

        const saveData = storage
          ? (JSON.parse(storage) as SimulationRecord[])
          : []

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...saveData, record]),
        )

        return id
    }

    const getFormData = (id: string): SimulationRecord | null => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

        if(!storage){
            return null
        }

        const savedData = JSON.parse(storage) as SimulationRecord[]
        return savedData.find((record) => record.id === id) || null
    }

    const updateSimulation = (id: string, data: SimulationRecord) => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

        const updated = savedData.map((record) =>
        record.id === id ? {...data} : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    }

    // Para deletar uma simulação no localStorage, será ultilizado na página de simulação.
    const deleteSimulation = (id: string) => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storage) {
            return;
        }

        const savedData = JSON.parse(storage) as SimulationRecord[];

        const updated = savedData.filter(
            (record) => record.id !== id
        );

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updated),
        );
    };

    return {saveFormData, getFormData, updateSimulation, deleteSimulation}
}



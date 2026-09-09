import { HistoricList } from "@/components/features/simulationResults/HistoricList"
import { useSimulationStorage } from "@/hooks/useSimulationStorage"
import { useNavigate } from "react-router-dom"
import type { JSX } from "react/jsx-runtime"

export function HistoricPage(): JSX.Element {

    const records = JSON.parse(
        localStorage.getItem('simulation-data') ?? '[]'
    )

    console.log('Records:', records)

    const navigate = useNavigate()

    const { deleteSimulation } = useSimulationStorage();

    return (
        <div className="flex flex-col gap-4 px-7">
            {records.map((element: {
                id?: string | undefined
                goalName: string
                date: string
                goalAmount: string
                goalDeadLine: string
            }, index: number) => {
                return (
                    <div key={element.id ?? index}>
                        <HistoricList
                            title={element.goalName}
                            date={element.date}
                            goalValue={element.goalAmount}
                            goalDeadLine={element.goalDeadLine}
                            goalMonthlySavings={element.goalAmount}
                            onDelete={() => {

                                const confirmed = window.confirm(
                                    `Tem certesza que deseja excluir a simulação "${element.goalName}"?`
                                )

                                if (element.id && confirmed) {
                                        deleteSimulation(element.id);
                                        window.location.reload();
                                }
                            }}
                            onDetails={() => {
                                navigate(`/resultado/${element.id}`)
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

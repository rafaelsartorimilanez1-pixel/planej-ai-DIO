import { Button } from "@/components/shared/Button";
import { ExternalLink, Goal, Trash } from "lucide-react";

interface HistoricListProps {
  title: string;
  date: string;
  goalValue: string;
  goalDeadLine: string;
  goalMonthlySavings: string;
  onDelete: () => void;
  onDetails: () => void;
}

export const HistoricList = ({
  title,
  date,
  goalValue,
  goalDeadLine,
  goalMonthlySavings,
  onDelete,
  onDetails,
}: HistoricListProps) => {
  return (
    <div
      className="
        grid w-full items-center
        grid-cols-[minmax(180px,1fr)_120px_70px_130px_auto_auto]
        gap-4
        rounded-2xl
        bg-white
        px-6 py-5
        shadow-[0_4px_12px_rgba(0,0,0,0.12)]

        max-md:flex
        max-md:flex-col
        max-md:items-stretch
        max-md:gap-5
        max-md:px-5
        max-md:py-4
      "
    >
      {/* Título */}
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-lg
            bg-purple-100
            text-purple-500
          "
        >
          <Goal size={18} />
        </span>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-indigo-400">
            {date}
          </p>
        </div>
      </div>

      {/* Informações */}
      <div
        className="
          contents

          max-md:grid
          max-md:grid-cols-2
          max-md:gap-x-6
          max-md:gap-y-4
        "
      >
        {/* Custo da meta */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
            Custo da meta
          </p>

          <h2 className="mt-1 text-sm font-semibold text-gray-900">
            {goalValue}
          </h2>
        </div>

        {/* Prazo */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
            Prazo
          </p>

          <h2 className="mt-1 text-sm font-semibold text-gray-900">
            {goalDeadLine}
          </h2>
        </div>

        {/* Economia mensal */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
            Economia mensal
          </p>

          <h2 className="mt-1 text-sm font-semibold text-gray-900">
            {goalMonthlySavings}
          </h2>
        </div>
      </div>

      {/* Ações */}
      <div
        className="
          flex items-center gap-3
          max-md:border-t
          max-md:border-gray-200
          max-md:pt-4
        "
      >
        {/* Deletar */}
        <div className="border-l border-gray-200 pl-4 max-md:border-l-0 max-md:pl-0">
          <Button
            variant="ghost"
            icon={Trash}
            className="p-2 text-red-500 hover:bg-red-50"
            onClick={onDelete}
          >
            Deletar
          </Button>
        </div>

        {/* Ver detalhes */}
        <Button
          variant="secondary"
          icon={ExternalLink}
          className="rounded-full"
          onClick={onDetails}
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  );
};

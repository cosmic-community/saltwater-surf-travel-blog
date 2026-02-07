import type { DifficultyOption } from '@/types'

interface DifficultyBadgeProps {
  difficulty: DifficultyOption
  size?: 'sm' | 'md'
}

const colorMap: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
}

export default function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const colorClasses = colorMap[difficulty.key] ?? 'bg-gray-100 text-gray-600'
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-block font-semibold uppercase tracking-wider rounded-full ${colorClasses} ${sizeClasses}`}
    >
      {difficulty.value}
    </span>
  )
}
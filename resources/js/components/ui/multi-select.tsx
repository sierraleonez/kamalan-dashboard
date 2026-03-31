import * as React from "react"
import { X, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface MultiSelectOption {
  id: number
  name: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: number[]
  onChange: (value: number[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select items...",
  className,
  disabled = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    return options.filter(option =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])

  // Get selected option objects
  const selectedOptions = React.useMemo(() => {
    return options.filter(option => value.includes(option.id))
  }, [options, value])

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus input when dropdown opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const toggleOption = (optionId: number) => {
    const newValue = value.includes(optionId)
      ? value.filter(id => id !== optionId)
      : [...value, optionId]
    onChange(newValue)
  }

  const removeOption = (optionId: number) => {
    onChange(value.filter(id => id !== optionId))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex min-h-[38px] w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-xs",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isOpen && "ring-2 ring-primary/50"
        )}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selectedOptions.map(option => (
              <Badge
                key={option.id}
                variant="secondary"
                className="gap-1 pr-1"
              >
                <span>{option.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeOption(option.id)
                  }}
                  className="ml-1 rounded-full hover:bg-gray-300 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 opacity-50 transition-transform ml-2 flex-shrink-0",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map(option => {
                const isSelected = value.includes(option.id)
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleOption(option.id)}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-sm rounded-sm",
                      "hover:bg-gray-100 cursor-pointer",
                      isSelected && "bg-gray-50"
                    )}
                  >
                    <div className={cn(
                      "h-4 w-4 border rounded flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-primary border-primary" : "border-gray-300"
                    )}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="flex-1 text-left">{option.name}</span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

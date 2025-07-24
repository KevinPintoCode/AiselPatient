'use client'

import * as React from 'react'
import { format, parseISO, subYears } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Props {
    value: string | ''
    onChange: (val: string) => void
    placeholder?: string
    className?: string
}

export function DatePicker({ value, onChange, placeholder = 'Pick a date', className }: Props) {
    const today = new Date()
    const maxDate = today
    const minDate = subYears(today, 120)
    const defaultMonth = value ? parseISO(value) : subYears(today, 30)
    const [date, setDate] = React.useState<Date | undefined>(value ? parseISO(value) : undefined)

    React.useEffect(() => {
        if (value) {
            const parsedDate = parseISO(value)
            setDate(parsedDate)
        }
    }, [value])

    const handleSelect = (d?: Date) => {
        setDate(d)
        if (d) onChange(format(d, 'yyyy-MM-dd'))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    data-empty={!date}
                    className={cn(
                        'data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal',
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    defaultMonth={defaultMonth}
                    fromDate={minDate}
                    toDate={maxDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
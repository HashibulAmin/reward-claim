import { format, isBefore, startOfDay, parseISO } from 'date-fns';

export interface TimeSlot {
    id: string;
    label: string;
    startTime: string; // HH:mm (24h)
    endTime: string;   // HH:mm (24h)
}

export const TIME_SLOTS: TimeSlot[] = [
    { id: 'morning', label: '10:00 AM - 1:00 PM', startTime: '10:00', endTime: '13:00' },
    { id: 'afternoon', label: '1:00 PM - 4:00 PM', startTime: '13:00', endTime: '16:00' },
    { id: 'evening', label: '4:00 PM - 7:00 PM', startTime: '16:00', endTime: '19:00' },
    { id: 'night', label: '7:00 PM - 10:00 PM', startTime: '19:00', endTime: '22:00' },
];

export const isDateInPast = (date: Date): boolean => {
    const today = startOfDay(new Date());
    return isBefore(startOfDay(date), today);
};

export const getAvailableSlots = (_date: Date): TimeSlot[] => {
    // logic could be expanded to filter past slots for the current day
    // for now, we return all slots as the requirements didn't specify strict same-day time filtering
    return TIME_SLOTS;
};

export const formatDateForInput = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (dateString: string): string => {
    return format(parseISO(dateString), 'MMMM do, yyyy');
};

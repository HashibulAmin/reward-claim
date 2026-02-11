import { z } from 'zod';
import { isDateInPast } from '../utils/timeSlots';

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const claimFormSchema = z.object({
    userName: z.string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be less than 100 characters" }),

    pickupLocation: z.string()
        .min(3, { message: "Please enter a valid location" }),

    pickupNumber: z.string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .regex(phoneRegex, { message: "Invalid phone number format" }),

    pickupDate: z.string()
        .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
            message: "Invalid date"
        })
        .refine((dateStr) => !isDateInPast(new Date(dateStr)), {
            message: "Date cannot be in the past"
        }),

    pickupTimeSlot: z.string()
        .min(1, { message: "Please select a time slot" }),
});

export type ClaimFormData = z.infer<typeof claimFormSchema>;

import { Timestamp } from 'firebase/firestore';

export interface User {
    userId: string;
    email: string;
    createdAt: Timestamp;
    claimLinks: string[]; // Array of linkIds
}

export interface ClaimLink {
    linkId: string; // Unique identifier (nanoid)
    createdBy: string; // User email
    createdAt: Timestamp;
    isActive: boolean;
    title?: string; // Optional title for the campaign
}

export type ClaimStatus = 'pending' | 'completed' | 'cancelled';

export interface Claim {
    claimId: string;
    linkId: string;
    ownerEmail: string; // Admin who owns this claim
    userName: string;
    pickupLocation: string;
    pickupNumber: string;
    pickupDate: string; // YYYY-MM-DD
    pickupTimeSlot: string;
    claimedAt: Timestamp;
    status: ClaimStatus;
}

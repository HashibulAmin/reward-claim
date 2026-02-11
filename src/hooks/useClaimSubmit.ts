import { useState } from 'react';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ClaimFormData } from '../lib/validation';
import type { ClaimLink } from '../types/firestore';

interface UseClaimSubmitResult {
    submitClaim: (linkId: string, data: ClaimFormData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

export const useClaimSubmit = (): UseClaimSubmitResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitClaim = async (linkId: string, data: ClaimFormData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // 1. Validate linkId and get ownerEmail
            // Note: Security rules will also enforce this, but good to check here for better UI feedback
            const linkRef = doc(db, 'claimLinks', linkId);
            const linkSnap = await getDoc(linkRef);

            if (!linkSnap.exists()) {
                throw new Error('Invalid reward link.');
            }

            const linkData = linkSnap.data() as ClaimLink;

            if (!linkData.isActive) {
                throw new Error('This reward link is no longer active.');
            }

            // 2. Create claim
            const claimsRef = collection(db, 'claims');
            await addDoc(claimsRef, {
                linkId,
                ownerEmail: linkData.createdBy,
                userName: data.userName,
                pickupLocation: data.pickupLocation,
                pickupNumber: data.pickupNumber,
                pickupDate: data.pickupDate, // Already string YYYY-MM-DD from validation
                pickupTimeSlot: data.pickupTimeSlot,
                status: 'pending',
                claimedAt: serverTimestamp(),
            });

            setSuccess(true);
        } catch (err: any) {
            console.error('Error submitting claim:', err);
            setError(err.message || 'Failed to submit claim. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { submitClaim, isLoading, error, success };
};

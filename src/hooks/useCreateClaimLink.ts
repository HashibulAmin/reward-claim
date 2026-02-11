import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { nanoid } from 'nanoid';

interface UseCreateClaimLinkResult {
    createLink: (rewardName: string, userEmail: string) => Promise<string>;
    isLoading: boolean;
    error: string | null;
}

export const useCreateClaimLink = (): UseCreateClaimLinkResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createLink = async (rewardName: string, userEmail: string): Promise<string> => {
        setIsLoading(true);
        setError(null);

        try {
            // Generate unique link ID
            const linkId = nanoid(10);

            // Create claim link document with linkId as the document ID
            const linkRef = doc(db, 'claimLinks', linkId);
            await setDoc(linkRef, {
                linkId,
                createdBy: userEmail,
                createdAt: serverTimestamp(),
                isActive: true,
                title: rewardName,
            });

            // Return the full URL
            const link = `${window.location.origin}/claim/${linkId}`;
            return link;
        } catch (err: any) {
            console.error('Error creating claim link:', err);
            const errorMessage = err.message || 'Failed to create claim link. Please try again.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { createLink, isLoading, error };
};

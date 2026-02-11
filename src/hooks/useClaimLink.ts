import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ClaimLink } from '../types/firestore';

interface UseClaimLinkResult {
    link: ClaimLink | null;
    isValid: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useClaimLink = (linkId: string | undefined): UseClaimLinkResult => {
    const [link, setLink] = useState<ClaimLink | null>(null);
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLink = async () => {
            if (!linkId) {
                setIsValid(false);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const linkRef = doc(db, 'claimLinks', linkId);
                const linkSnap = await getDoc(linkRef);

                if (linkSnap.exists()) {
                    const data = linkSnap.data() as ClaimLink;
                    if (data.isActive) {
                        setLink(data);
                        setIsValid(true);
                    } else {
                        setError('This reward link has expired.');
                        setIsValid(false);
                    }
                } else {
                    setError('Invalid reward link.');
                    setIsValid(false);
                }
            } catch (err: any) {
                console.error('Error fetching link:', err);
                setError('Failed to load reward details.');
                setIsValid(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLink();
    }, [linkId]);

    return { link, isValid, isLoading, error };
};

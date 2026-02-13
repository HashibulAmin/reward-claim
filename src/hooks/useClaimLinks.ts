import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ClaimLink } from '../types/firestore';

interface UseClaimLinksResult {
    links: ClaimLink[];
    isLoading: boolean;
    error: string | null;
}

export const useClaimLinks = (userEmail: string | null | undefined): UseClaimLinksResult => {
    const [links, setLinks] = useState<ClaimLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userEmail) {
            setLinks([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const linksRef = collection(db, 'claimLinks');
        const q = query(
            linksRef,
            where('createdBy', '==', userEmail),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newLinks: ClaimLink[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                newLinks.push({
                    linkId: doc.id,
                    ...data,
                    createdAt: data.createdAt as Timestamp
                } as ClaimLink);
            });
            setLinks(newLinks);
            setIsLoading(false);
        }, (err) => {
            console.error('Error fetching claim links:', err);
            setError('Failed to load links.');
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [userEmail]);

    return { links, isLoading, error };
};

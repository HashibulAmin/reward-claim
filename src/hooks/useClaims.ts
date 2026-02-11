import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import type { QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Claim } from '../types/firestore';

interface UseClaimsResult {
    claims: Claim[];
    isLoading: boolean;
    error: string | null;
}

export const useClaims = (ownerEmail: string | null | undefined): UseClaimsResult => {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!ownerEmail) {
            setClaims([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const claimsRef = collection(db, 'claims');
        // Requires composite index: ownerEmail ASC, claimedAt DESC
        const q = query(
            claimsRef,
            where('ownerEmail', '==', ownerEmail),
            orderBy('claimedAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const newClaims: Claim[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    newClaims.push({
                        claimId: doc.id,
                        ...data,
                        // Ensure timestamp handling is safe if it's not yet fully written (latency compensation)
                        claimedAt: data.claimedAt as Timestamp
                    } as Claim);
                });
                setClaims(newClaims);
                setIsLoading(false);
            },
            (err: any) => {
                console.error('Error fetching claims:', err);
                setError('Failed to load claims. Permission denied?');
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [ownerEmail]);

    return { claims, isLoading, error };
};

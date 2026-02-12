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
        const linksRef = collection(db, 'claimLinks');

        // 1. First fetch claimLinks to get titles
        const linksQuery = query(linksRef, where('createdBy', '==', ownerEmail));

        const unsubscribe = onSnapshot(linksQuery, (linksSnapshot) => {
            const linksMap: Record<string, string> = {};
            linksSnapshot.forEach(doc => {
                const data = doc.data();
                linksMap[doc.id] = data.title || 'Untitled Reward';
            });

            // 2. Then set up listener for claims
            const claimsQuery = query(
                claimsRef,
                where('ownerEmail', '==', ownerEmail),
                orderBy('claimedAt', 'desc')
            );

            const unsubscribeClaims = onSnapshot(claimsQuery,
                (snapshot: QuerySnapshot<DocumentData>) => {
                    const newClaims: Claim[] = [];
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        newClaims.push({
                            claimId: doc.id,
                            ...data,
                            rewardName: linksMap[data.linkId] || 'Unknown Reward',
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

            return () => unsubscribeClaims();
        }, (err) => {
            console.error('Error fetching links:', err);
            setError('Failed to load reward names.');
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [ownerEmail]);

    return { claims, isLoading, error };
};

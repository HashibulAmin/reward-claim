# Firebase Security Rules Configuration

## Firestore Security Rules

You need to configure Firestore security rules in the Firebase Console to allow authenticated users to read and write data.

### How to Apply These Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Replace the existing rules with the rules below
5. Click **Publish**

### Security Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the resource
    function isOwner(ownerEmail) {
      return isAuthenticated() && request.auth.token.email == ownerEmail;
    }
    
    // Claim Links Collection
    match /claimLinks/{linkId} {
      // Anyone can read claim links (needed for public claim page)
      allow read: if true;
      
      // Only authenticated users can create claim links
      allow create: if isAuthenticated() 
                    && request.resource.data.createdBy == request.auth.token.email;
      
      // Only the creator can update/delete their claim links
      allow update, delete: if isAuthenticated() 
                             && resource.data.createdBy == request.auth.token.email;
    }
    
    // Claims Collection
    match /claims/{claimId} {
      // Anyone can create a claim (public users claiming rewards)
      allow create: if true;
      
      // Only the owner (admin who created the link) can read their claims
      allow read: if isAuthenticated() 
                  && resource.data.ownerEmail == request.auth.token.email;
      
      // Only the owner can update/delete claims
      allow update, delete: if isAuthenticated() 
                            && resource.data.ownerEmail == request.auth.token.email;
    }
  }
}
```

### Rule Explanation

**Claim Links (`/claimLinks/{linkId}`)**:
- ✅ **Read**: Public (anyone can read to validate links on claim page)
- ✅ **Create**: Authenticated users only, must set `createdBy` to their email
- ✅ **Update/Delete**: Only the creator

**Claims (`/claims/{claimId}`)**:
- ✅ **Create**: Public (anyone can submit a claim)
- ✅ **Read**: Only the admin who owns the claim (via `ownerEmail` field)
- ✅ **Update/Delete**: Only the owner

### Required Firestore Indexes

You also need to create a composite index for the claims query:

1. Go to **Firestore Database** → **Indexes**
2. Click **Create Index**
3. Configure:
   - **Collection ID**: `claims`
   - **Fields to index**:
     - Field: `ownerEmail`, Order: `Ascending`
     - Field: `claimedAt`, Order: `Descending`
   - **Query scope**: `Collection`
4. Click **Create**

Alternatively, when you first run the app and try to fetch claims, Firebase will show an error in the console with a direct link to create the required index automatically.

### Testing the Rules

After applying the rules:

1. **Login** with your admin account (`ihemel.net@gmail.com`)
2. **Create a claim link** - should work ✅
3. **View claims** - should work ✅
4. **Submit a claim** (public) - should work ✅

### Security Notes

> [!IMPORTANT]
> These rules ensure:
> - Only authenticated admins can create claim links
> - Only authenticated admins can view their own claims
> - Public users can submit claims without authentication
> - Each admin can only see claims associated with their email

> [!WARNING]
> If you want to restrict who can be an admin, you'll need to add additional checks using custom claims or a separate `admins` collection.

import React from 'react';
import { DashboardLayout } from '../components/admin/DashboardLayout';
import { CreateLinkForm } from '../components/admin/CreateLinkForm';
import { ClaimLinksTable } from '../components/admin/ClaimLinksTable';

export const CreateLinkPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CreateLinkForm />
        <ClaimLinksTable />
      </div>
    </DashboardLayout>
  );
};

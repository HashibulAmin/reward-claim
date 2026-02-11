import React from 'react';
import { DashboardLayout } from '../components/admin/DashboardLayout';
import { CreateLinkForm } from '../components/admin/CreateLinkForm';

export const CreateLinkPage: React.FC = () => {
  return (
    <DashboardLayout>
      <CreateLinkForm />
    </DashboardLayout>
  );
};

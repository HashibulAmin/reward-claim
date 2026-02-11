import React from 'react';
import { DashboardLayout } from '../components/admin/DashboardLayout';
import { ClaimsTable } from '../components/admin/ClaimsTable';

export const ClaimsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ClaimsTable />
    </DashboardLayout>
  );
};

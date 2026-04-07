import { redirect } from 'next/navigation';

// Redirect legacy CRM to the unified dashboard (leads tab)
export default function LegacyCRMRedirect() {
  redirect('/admin/dashboard');
}

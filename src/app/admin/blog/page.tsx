import { redirect } from 'next/navigation';

// Redirect legacy blog admin to the unified dashboard (blog tab)
export default function LegacyBlogAdminRedirect() {
  redirect('/admin/dashboard');
}

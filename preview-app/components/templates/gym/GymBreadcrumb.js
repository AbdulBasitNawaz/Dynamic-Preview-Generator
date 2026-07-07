import { useLeadContext } from '@/contexts/LeadContext';
import CustomLink from '@/components/CustomLink';

export default function GymBreadcrumb({ title, crumbs = [] }) {
  const lead = useLeadContext();

  return (
    <section
      className="breadcrumb-section"
      style={{ backgroundImage: `url(${lead.breadcrumbBg})` }}
    >
      <div className="container">
        <div className="breadcrumb-text">
          <h2>{title}</h2>
          <div className="bt-option">
            <CustomLink href="/">Home</CustomLink>
            {crumbs.map((crumb, i) =>
              crumb.href ? (
                <CustomLink key={i} href={crumb.href}>{crumb.label}</CustomLink>
              ) : (
                <span key={i}>{crumb.label}</span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

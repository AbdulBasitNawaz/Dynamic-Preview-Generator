'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SalesDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/leads.json')
      .then(r => r.json())
      .then(data => setLeads(data))
      .catch(console.error);
  }, []);

  const categories = ['All', 'Gym / Fitness', 'Salon / Spa', 'Café / Restaurant', 'Retail / E-commerce', 'Local Business'];

  const filtered = leads.filter(lead => {
    const matchSearch = lead.businessName.toLowerCase().includes(search.toLowerCase()) ||
      lead.slug.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || lead.category === filter;
    return matchSearch && matchFilter;
  });

  const openPreview = (slug) => {
    router.push(`/?lead=${slug}`);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <span className="dashboard-logo-icon">⚡</span>
          <h1>Dynamic Preview Generator</h1>
        </div>
        <p className="dashboard-subtitle">
          Select a lead below to open their personalized website preview
        </p>
      </div>

      {/* Filters */}
      <div className="dashboard-controls">
        <div className="dashboard-search">
          <i className="fa fa-search" />
          <input
            type="text"
            placeholder="Search by business name or slug..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="dashboard-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? ' filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="dashboard-stats">
        <div className="stat-item">
          <span className="stat-number">{leads.length}</span>
          <span className="stat-label">Total Leads</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filtered.length}</span>
          <span className="stat-label">Showing</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.length - 1}</span>
          <span className="stat-label">Categories</span>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="leads-grid">
        {filtered.map(lead => (
          <div
            key={lead.slug}
            className="lead-card"
            onClick={() => openPreview(lead.slug)}
            style={{ '--card-primary': lead.primaryColor || '#f36100' }}
          >
            <div className="lead-card-accent" style={{ background: lead.primaryColor || '#f36100' }} />
            <div className="lead-card-body">
              <div className="lead-card-logo">
                {lead.logoUrl && lead.logoUrl !== 'https://placeholder.com/logo.png' ? (
                  <img src={lead.logoUrl} alt={lead.businessName} />
                ) : (
                  <div
                    className="lead-card-initials"
                    style={{ background: lead.primaryColor || '#f36100' }}
                  >
                    {lead.businessName.split(' ').slice(0, 2).map(w => w[0]).join('')}
                  </div>
                )}
              </div>
              <div className="lead-card-info">
                <h3>{lead.businessName}</h3>
                <span className="lead-card-category">{lead.category}</span>
                <span className="lead-card-phone">
                  <i className="fa fa-phone" /> {lead.phoneNumber}
                </span>
              </div>
            </div>
            <div className="lead-card-footer">
              <div className="lead-colors">
                <span
                  className="color-dot"
                  style={{ background: lead.primaryColor || '#f36100' }}
                  title={lead.primaryColor}
                />
                <span
                  className="color-dot"
                  style={{ background: lead.secondaryColor || '#151515' }}
                  title={lead.secondaryColor}
                />
              </div>
              <button className="lead-preview-btn">
                Preview <i className="fa fa-external-link" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="dashboard-empty">
          <i className="fa fa-search" />
          <p>No leads found matching your search.</p>
        </div>
      )}
    </div>
  );
}

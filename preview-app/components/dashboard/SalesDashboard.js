'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SalesDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

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
      <div className="dashboard-header" style={{ position: 'relative' }}>
        <Link 
          href="/admin" 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px', 
            background: 'rgba(255,255,255,0.1)', 
            color: '#fff', 
            padding: '8px 16px', 
            borderRadius: '6px', 
            textDecoration: 'none', 
            fontSize: '14px', 
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <span>Admin Panel</span>
          <span>⚙️</span>
        </Link>
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
        <div className="dashboard-filters" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`filter-btn${viewMode === 'grid' ? ' filter-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`filter-btn${viewMode === 'list' ? ' filter-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
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

      {/* Leads Grid / List */}
      <div className={`leads-grid ${viewMode === 'list' ? 'leads-list' : ''}`}>
        {filtered.map((lead, i) => (
          <div
            key={`${i}-${lead.slug}`}
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

import React, { useState } from 'react';
import { Download, FileText, Building, TrendingUp, Users, DollarSign, Target, Calendar, Shield, Lightbulb } from 'lucide-react';
import { jsPDF } from 'jspdf';

const BusinessPlanTemplate = () => {
  const [sampleData] = useState({
    projectName: "TechFlow Solutions",
    projectDescription: "An innovative SaaS platform for project management",
    solutionType: "SaaS Platform",
    audience: "Small to medium businesses",
    budget: "$150,000",
    timing: "12 months",
    features: ["Real-time collaboration", "Advanced analytics", "Mobile app"],
    visualStyle: "Modern and professional",
    userInspiration: "Streamlined workflow automation",
    missionParts: ["Empower teams", "Increase productivity", "Drive innovation"],
    businessPlan: `EXECUTIVE SUMMARY

Project: TechFlow Solutions
Core Value Proposition: An innovative SaaS platform that revolutionizes project management through intelligent automation and real-time collaboration features.
Target Market: Small to medium businesses seeking efficient project management solutions
Budget: $150,000
Timeline: 12 months

Our platform addresses the critical need for streamlined project management in growing businesses. By combining advanced analytics with intuitive design, we create value through increased productivity and reduced operational overhead.

PROJECT PRESENTATION

Project Name: TechFlow Solutions
Detailed Description: TechFlow Solutions is a comprehensive project management platform designed to eliminate workflow bottlenecks and enhance team collaboration. Our solution integrates advanced task automation, real-time progress tracking, and intelligent resource allocation to deliver measurable productivity gains.

Solution Type: SaaS Platform
Key Features:
• Real-time collaboration tools with instant messaging and file sharing
• Advanced analytics dashboard with customizable reporting
• Mobile application for on-the-go project management
• AI-powered task prioritization and deadline management
• Integration with popular business tools (Slack, Google Workspace, Microsoft 365)

Visual Style: Modern and professional interface with clean lines, intuitive navigation, and responsive design that works seamlessly across all devices.

MARKET ANALYSIS

Target Audience: Small to medium businesses (10-500 employees) in technology, consulting, marketing, and professional services sectors.

Market Size and Opportunity:
The global project management software market is valued at $6.68 billion and is expected to grow at 10.67% CAGR through 2028. Our target segment represents approximately 35% of this market, presenting a $2.3 billion opportunity.

Competitive Landscape Analysis:
Primary competitors include Asana, Monday.com, and Trello. Our competitive advantage lies in AI-powered automation and industry-specific customization options that larger platforms don't offer.

Market Trends:
• Increased remote work adoption driving demand for collaboration tools
• Growing emphasis on data-driven decision making
• Rising need for mobile-first solutions
• Integration capabilities becoming critical differentiator

User Pain Points and Solutions:
• Problem: Complex project management tools with steep learning curves
  Solution: Intuitive interface with guided onboarding
• Problem: Lack of real-time visibility into project progress
  Solution: Live dashboard with automated status updates
• Problem: Poor mobile experience limiting field team productivity
  Solution: Native mobile app with full feature parity

DIGITAL MARKETING STRATEGY

Marketing Approach: Multi-channel digital strategy focused on content marketing, strategic partnerships, and targeted advertising to reach decision-makers in our target market.

Digital Channels Strategy:
• Content Marketing: Weekly blog posts, whitepapers, and case studies
• SEO/SEM: Target high-intent keywords related to project management
• Social Media: LinkedIn and Twitter for B2B engagement
• Email Marketing: Nurture sequences for free trial users
• Webinar Series: Monthly educational sessions for prospects

User Acquisition Plan:
• Freemium model to reduce adoption barriers
• Referral program incentivizing existing customers
• Partnership channel with business consultants
• Trade show presence at key industry events

Brand Positioning: "The intelligent project management platform that grows with your business"

Marketing Budget Allocation:
• Digital Advertising: 40% ($24,000)
• Content Creation: 25% ($15,000)
• Events & Partnerships: 20% ($12,000)
• Marketing Tools & Technology: 15% ($9,000)

PRODUCT AND TECHNICAL ROADMAP

Development Phases:
Phase 1 (Months 1-4): MVP Development
• Core project management features
• User authentication and basic dashboard
• Web application with responsive design

Phase 2 (Months 5-8): Advanced Features
• Mobile application development
• Advanced analytics and reporting
• Third-party integrations

Phase 3 (Months 9-12): AI and Automation
• Machine learning algorithms for task prioritization
• Automated reporting and notifications
• Advanced customization options

Technical Architecture Overview:
• Frontend: React.js with TypeScript for scalability
• Backend: Node.js with Express framework
• Database: PostgreSQL for data integrity
• Cloud Infrastructure: AWS with auto-scaling capabilities
• Security: End-to-end encryption and SOC 2 compliance

Technology Stack Recommendations:
• Development: React, Node.js, PostgreSQL, Redis
• Deployment: Docker containers on AWS ECS
• Monitoring: DataDog for performance tracking
• Security: Auth0 for authentication, SSL certificates

MVP vs. Full Product Features:
MVP: Basic project creation, task management, team collaboration
Full Product: AI automation, advanced analytics, mobile apps, enterprise integrations

RISK ASSESSMENT

Technical Risks:
• Scalability challenges as user base grows
• Integration complexity with third-party systems
• Data security and compliance requirements
Mitigation: Robust testing, phased rollout, security audits

Market Risks:
• Competitive pressure from established players
• Economic downturn affecting B2B software spending
• Changing customer preferences and needs
Mitigation: Unique value proposition, flexible pricing, customer feedback loops

Financial Risks:
• Higher than expected customer acquisition costs
• Longer sales cycles than projected
• Cash flow challenges during growth phase
Mitigation: Conservative financial planning, diverse marketing channels, investor relationships

Competition Risks:
• New entrants with innovative features
• Price wars reducing profit margins
• Platform consolidation by major players
Mitigation: Continuous innovation, strong customer relationships, niche market focus

FINANCIAL PROJECTIONS

Budget Breakdown:
Development: $90,000 (60%)
Marketing: $30,000 (20%)
Operations: $20,000 (13%)
Legal/Compliance: $10,000 (7%)

Revenue Projections (Year 1-3):
Year 1: $50,000 (200 customers at $250 ARR)
Year 2: $300,000 (1,000 customers at $300 ARR)
Year 3: $750,000 (2,100 customers at $357 ARR)

Cost Structure:
• Development: 35% of revenue
• Marketing: 25% of revenue
• Operations: 20% of revenue
• General & Administrative: 20% of revenue

Break-even Analysis:
Break-even point: Month 18 with 800 active customers
Monthly recurring revenue needed: $62,500

Funding Requirements:
Initial Investment: $150,000
Series A (Month 12): $500,000 for scaling operations
Total Funding Need: $650,000 over 18 months

TEAM AND EXECUTION

Mission Statement: Empower teams to increase productivity and drive innovation through intelligent project management solutions that adapt to the way modern businesses work.

Team Structure Requirements:
• Technical Team: 4 developers, 1 DevOps engineer, 1 QA specialist
• Product Team: 1 product manager, 1 UX/UI designer
• Business Team: 1 CEO, 1 sales manager, 1 marketing specialist
• Operations: 1 customer success manager, 1 finance/admin

Key Roles and Responsibilities:
CEO: Strategy, fundraising, partnership development
CTO: Technical architecture, team leadership
Product Manager: Feature roadmap, customer requirements
Sales Manager: Customer acquisition, relationship management

Timeline: 12-month development cycle with quarterly milestones
• Q1: Team building, technical foundation
• Q2: MVP development and alpha testing
• Q3: Beta launch and customer feedback
• Q4: Full product launch and market entry

Success Metrics:
• Customer Acquisition: 200 customers by month 12
• Revenue: $50,000 ARR by end of year 1
• Product: 95% uptime, <2 second response times
• Customer Satisfaction: Net Promoter Score >50
• Team: <10% employee turnover rate`
  });

  const downloadProfessionalPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let currentY = margin;

    // Define colors
    const primaryColor = [99, 67, 242]; // Purple
    const secondaryColor = [75, 85, 99]; // Gray
    const accentColor = [34, 197, 94]; // Green

    // Helper functions
    const addNewPageIfNeeded = (requiredHeight) => {
      if (currentY + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
        return true;
      }
      return false;
    };

    const drawHeader = (isFirstPage = false) => {
      if (isFirstPage) {
        // Cover page header
        pdf.setFillColor(...primaryColor);
        pdf.rect(0, 0, pageWidth, 60, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BUSINESS PLAN', pageWidth / 2, 25, { align: 'center' });
        
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'normal');
        pdf.text(sampleData.projectName, pageWidth / 2, 40, { align: 'center' });
        
        // Add date
        pdf.setFontSize(10);
        pdf.text(new Date().toLocaleDateString(), pageWidth / 2, 50, { align: 'center' });
        
        currentY = 80;
      } else {
        // Regular page header
        pdf.setFillColor(...primaryColor);
        pdf.rect(0, 0, pageWidth, 15, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(sampleData.projectName + ' - Business Plan', margin, 10);
        
        currentY = 25;
      }
    };

    const drawFooter = (pageNum) => {
      pdf.setTextColor(...secondaryColor);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      pdf.text('Confidential Business Plan', margin, pageHeight - 10);
    };

    const addSection = (title, content, icon = null) => {
      addNewPageIfNeeded(30);
      
      // Section header with background
      pdf.setFillColor(245, 245, 255);
      pdf.rect(margin - 5, currentY - 5, contentWidth + 10, 20, 'F');
      
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, margin, currentY + 8);
      
      currentY += 25;
      
      // Content
      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(content, contentWidth);
      lines.forEach(line => {
        addNewPageIfNeeded(6);
        pdf.text(line, margin, currentY);
        currentY += 6;
      });
      
      currentY += 10; // Space after section
    };

    const addExecutiveSummary = () => {
      addNewPageIfNeeded(80);
      
      // Executive Summary with special styling
      pdf.setFillColor(...accentColor);
      pdf.rect(margin - 5, currentY - 5, contentWidth + 10, 25, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EXECUTIVE SUMMARY', margin, currentY + 12);
      
      currentY += 35;
      
      // Key metrics boxes
      const boxWidth = (contentWidth - 20) / 3;
      const boxes = [
        { label: 'Budget', value: sampleData.budget, color: [59, 130, 246] },
        { label: 'Timeline', value: sampleData.timing, color: [16, 185, 129] },
        { label: 'Market', value: sampleData.audience, color: [245, 101, 101] }
      ];
      
      boxes.forEach((box, index) => {
        const x = margin + (index * (boxWidth + 10));
        pdf.setFillColor(...box.color);
        pdf.rect(x, currentY, boxWidth, 30, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(box.label, x + boxWidth/2, currentY + 10, { align: 'center' });
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        const textLines = pdf.splitTextToSize(box.value, boxWidth - 4);
        pdf.text(textLines, x + boxWidth/2, currentY + 20, { align: 'center' });
      });
      
      currentY += 50;
    };

    // Generate PDF
    let pageNum = 1;

    // Cover page
    drawHeader(true);
    
    // Company overview box
    pdf.setFillColor(250, 250, 255);
    pdf.rect(margin, currentY, contentWidth, 60, 'F');
    pdf.setDrawColor(...primaryColor);
    pdf.rect(margin, currentY, contentWidth, 60);
    
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Project Overview', margin + 10, currentY + 15);
    
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(sampleData.projectDescription, margin + 10, currentY + 25);
    
    pdf.setFontSize(10);
    pdf.text(`Solution Type: ${sampleData.solutionType}`, margin + 10, currentY + 40);
    pdf.text(`Target Audience: ${sampleData.audience}`, margin + 10, currentY + 50);
    
    drawFooter(pageNum++);
    
    // Parse business plan content into sections
    const sections = sampleData.businessPlan.split(/\n\n(?=[A-Z][A-Z\s]+\n)/);
    
    sections.forEach(section => {
      if (section.trim()) {
        const lines = section.split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();
        
        pdf.addPage();
        drawHeader();
        
        if (title === 'EXECUTIVE SUMMARY') {
          addExecutiveSummary();
          addSection('', content);
        } else {
          addSection(title, content);
        }
        
        drawFooter(pageNum++);
      }
    });

    // Save the PDF
    pdf.save(`${sampleData.projectName.replace(/\s+/g, '_')}_Business_Plan.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 rounded-2xl p-4">
                <Building className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Professional Business Plan Template</h1>
                <p className="text-purple-100 text-lg">Generate beautiful, professional business plan PDFs</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Preview */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Document Preview
                </h2>
                
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                  <div className="space-y-4">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                      <h3 className="font-bold">BUSINESS PLAN</h3>
                      <p className="text-sm opacity-90">{sampleData.projectName}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-500 text-white px-3 py-2 rounded text-xs text-center">
                        <div className="font-semibold">Budget</div>
                        <div>{sampleData.budget}</div>
                      </div>
                      <div className="bg-green-500 text-white px-3 py-2 rounded text-xs text-center">
                        <div className="font-semibold">Timeline</div>
                        <div>{sampleData.timing}</div>
                      </div>
                      <div className="bg-red-500 text-white px-3 py-2 rounded text-xs text-center">
                        <div className="font-semibold">Market</div>
                        <div className="truncate">{sampleData.audience}</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <h4 className="font-semibold text-purple-600 mb-2">EXECUTIVE SUMMARY</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {sampleData.projectDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Template Features</h2>
                
                <div className="space-y-4">
                  {[
                    { icon: Target, title: 'Professional Layout', desc: 'Clean, modern design with proper spacing and typography' },
                    { icon: TrendingUp, title: 'Visual Elements', desc: 'Charts, graphs, and colored sections for better readability' },
                    { icon: Shield, title: 'Branded Headers', desc: 'Consistent branding throughout with company colors' },
                    { icon: Users, title: 'Structured Sections', desc: 'Well-organized content with clear section breaks' },
                    { icon: DollarSign, title: 'Financial Tables', desc: 'Professional financial projections and budget breakdowns' },
                    { icon: Calendar, title: 'Timeline Views', desc: 'Visual timelines and milestone presentations' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="bg-purple-100 rounded-lg p-2">
                        <feature.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Data Display */}
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Sample Business Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Project:</strong> {sampleData.projectName}</div>
                <div><strong>Type:</strong> {sampleData.solutionType}</div>
                <div><strong>Budget:</strong> {sampleData.budget}</div>
                <div><strong>Timeline:</strong> {sampleData.timing}</div>
                <div><strong>Target Market:</strong> {sampleData.audience}</div>
                <div><strong>Features:</strong> {sampleData.features.join(', ')}</div>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={downloadProfessionalPDF}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Download className="w-6 h-6" />
                Download Professional Business Plan PDF
              </button>
              <p className="text-gray-600 mt-4 text-sm">
                This template generates a professionally formatted PDF with your business plan content
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Code Preview */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2">// Integration example for your React component:</div>
          <div className="text-blue-400">const</div> <span className="text-yellow-400">downloadBusinessPlan</span> = () = {`{`}<br/>
          &nbsp;&nbsp;<span className="text-gray-400">// Replace the existing jsPDF code with the professional template</span><br/>
          &nbsp;&nbsp;<span className="text-blue-400">downloadProfessionalPDF</span>(<span className="text-orange-400">businessPlan</span>, <span className="text-orange-400">formData</span>);<br/>
          {`}`};
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanTemplate;
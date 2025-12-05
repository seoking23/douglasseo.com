from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib import colors
from reportlab.pdfgen import canvas

def create_resume():
    # Create the PDF document
    doc = SimpleDocTemplate(
        "/mnt/user-data/outputs/Douglas_Seo_Resume_AI_Research.pdf",
        pagesize=letter,
        rightMargin=0.5*inch,
        leftMargin=0.5*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )
    
    # Get default styles and create custom styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#444444'),
        alignment=TA_CENTER,
        spaceAfter=12
    )
    
    section_header = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=13,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=8,
        spaceBefore=12,
        fontName='Helvetica-Bold',
        borderWidth=0,
        borderColor=colors.HexColor('#333333'),
        borderPadding=0
    )
    
    subsection_header = ParagraphStyle(
        'SubsectionHeader',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.HexColor('#1a1a1a'),
        fontName='Helvetica-Bold',
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#2a2a2a'),
        spaceAfter=3,
        leading=13
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#2a2a2a'),
        leftIndent=15,
        spaceAfter=4,
        leading=13
    )
    
    # Content list
    story = []
    
    # Header
    story.append(Paragraph("DOUGLAS SEO", name_style))
    story.append(Paragraph(
        "San Francisco, CA | douglasseo.business@gmail.com | linkedin.com/in/douglas-seo-337133186 | github.com/seoking23",
        contact_style
    ))
    
    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_header))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceAfter=8))
    
    summary_text = """AI Research Engineer and Full-Stack Technical Leader with proven track record building scalable production systems 
    and profitable applications from 0-to-1. UC Berkeley EECS graduate with top 5% performance in AI/ML coursework. 
    Expertise in distributed systems architecture, database optimization, and machine learning infrastructure. Founded and scaled 
    consumer applications to 22,000+ monthly active users with $3,300 MRR. Specialized in building production-grade infrastructure that 
    bridges research prototypes to enterprise-scale deployment with focus on vector databases and semantic search systems."""
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))
    
    # Education
    story.append(Paragraph("EDUCATION", section_header))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceAfter=8))
    
    story.append(Paragraph(
        "<b>Bachelor of Science, Electrical Engineering & Computer Science</b> | <i>University of California, Berkeley</i> | 08/2022",
        subsection_header
    ))
    story.append(Paragraph(
        "• <b>CS 188-189 (Artificial Intelligence & Machine Learning):</b> Top 5% of class with Professor recognition",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Relevant Coursework:</b> Data Structures & Algorithms, Machine Learning, AI, Distributed Systems, Web Development, Cybersecurity",
        bullet_style
    ))
    story.append(Spacer(1, 6))
    
    # Technical Skills
    story.append(Paragraph("TECHNICAL EXPERTISE", section_header))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceAfter=8))
    
    skills_label_style = ParagraphStyle(
        'SkillsLabel',
        parent=styles['Normal'],
        fontSize=9,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor('#1a1a1a')
    )
    
    skills_content_style = ParagraphStyle(
        'SkillsContent',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#2a2a2a')
    )
    
    skills_data = [
        [Paragraph("Languages", skills_label_style), Paragraph("Python, TypeScript, JavaScript, C++, SQL, Korean (Professional Working)", skills_content_style)],
        [Paragraph("AI/ML Research", skills_label_style), Paragraph("Pre-training (Dataset Curation, Tokenization), Post-training (RLHF, DPO, Fine-tuning), Vector Embeddings, Semantic Search, Model Optimization, ML Algorithms", skills_content_style)],
        [Paragraph("Databases", skills_label_style), Paragraph("PostgreSQL, Firestore (NoSQL), Supabase, Prisma ORM, Vector Databases, Real-time Sync", skills_content_style)],
        [Paragraph("Backend", skills_label_style), Paragraph("Flask, REST APIs, OAuth, Google Cloud Platform, Firebase, Distributed Systems", skills_content_style)],
        [Paragraph("Frontend", skills_label_style), Paragraph("React, React Native, TypeScript, Web Development, Mobile Applications", skills_content_style)],
        [Paragraph("DevOps", skills_label_style), Paragraph("Cloud Infrastructure, CI/CD, Performance Optimization, System Architecture, Analytics Pipelines", skills_content_style)]
    ]
    
    skills_table = Table(skills_data, colWidths=[1.2*inch, 5.8*inch])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 8))
    
    # Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_header))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceAfter=8))
    
    # Azetta AI - Cosma
    story.append(Paragraph(
        "<b>Co-Founder & CTO</b> | Azetta AI - Cosma | San Francisco, CA | 10/2025 – Present",
        subsection_header
    ))
    story.append(Paragraph(
        "<i>Vector database infrastructure for AI applications · Distributed Systems, Vector Search, ML Infrastructure</i>",
        body_style
    ))
    story.append(Paragraph(
        "• Co-founding AI research lab focused on building production-grade vector database infrastructure for semantic search and retrieval",
        bullet_style
    ))
    story.append(Paragraph(
        "• Architecting distributed vector database system optimized for billion-scale embedding storage and sub-millisecond similarity search",
        bullet_style
    ))
    story.append(Paragraph(
        "• Co-leading technical strategy for pre-training data pipelines, model optimization, and post-training infrastructure",
        bullet_style
    ))
    story.append(Paragraph(
        "• Designing scalable ingestion pipelines for high-dimensional vector data with real-time indexing and retrieval capabilities",
        bullet_style
    ))
    story.append(Paragraph(
        "• Building research prototypes bridging academic ML advances to production-ready database systems",
        bullet_style
    ))
    story.append(Spacer(1, 6))
    
    # Werkflow
    story.append(Paragraph(
        "<b>Founding Engineer & CTO</b> | Werkflow | San Francisco, CA | 03/2025 – 10/2025",
        subsection_header
    ))
    story.append(Paragraph(
        "<i>AI-powered workflow automation platform · PostgreSQL, React, TypeScript, Supabase, Prisma ORM</i>",
        body_style
    ))
    story.append(Paragraph(
        "• Built complete product from 0-to-1, achieving <b>7,000+ monthly active users</b> within first year of launch",
        bullet_style
    ))
    story.append(Paragraph(
        "• Architected scalable backend infrastructure supporting real-time data synchronization and sub-100ms query latency",
        bullet_style
    ))
    story.append(Paragraph(
        "• Designed and implemented PostgreSQL database schema with Prisma ORM for type-safe data access and migrations",
        bullet_style
    ))
    story.append(Paragraph(
        "• Deployed production application on Supabase with authentication, row-level security, and automated backups",
        bullet_style
    ))
    story.append(Paragraph(
        "• Integrated AI models for intelligent workflow suggestions and automation recommendations",
        bullet_style
    ))
    story.append(Paragraph(
        "• Scaled to 100+ business clients and 400+ dancers using the platform for 100k annual gross transaction volume",
        bullet_style
    ))
    story.append(Spacer(1, 6))
    
    # Popper LLC
    story.append(Paragraph(
        "<b>Founder & CEO</b> | Popper LLC | San Francisco, CA | 12/2022 – 03/2025",
        subsection_header
    ))
    story.append(Paragraph(
        "<i>Mobile-first consumer application · React Native, Firestore, Google Cloud Platform, REST APIs</i>",
        body_style
    ))
    story.append(Paragraph(
        "• Founded and scaled to <b>3,300+ monthly active users</b> with <b>$400 monthly recurring revenue</b>, grossing $70k+ total transactions, and sustainable unit economics as first-time founder",
        bullet_style
    ))
    story.append(Paragraph(
        "• Built production React Native application handling <b>20,000+ daily Firestore operations</b> with real-time synchronization",
        bullet_style
    ))
    story.append(Paragraph(
        "• Designed and deployed <b>scalable NoSQL database architecture</b> with offline-first capabilities and conflict resolution",
        bullet_style
    ))
    story.append(Paragraph(
        "• Implemented production-grade REST APIs on Google Cloud with OAuth authentication, analytics pipelines, and push notifications",
        bullet_style
    ))
    story.append(Paragraph(
        "• Led and managed agile engineering team of 8 developers through code reviews, sprint planning, and technical roadmap execution",
        bullet_style
    ))
    story.append(Paragraph(
        "• Achieved profitability serving 60+ business clients through efficient customer acquisition and retention strategies",
        bullet_style
    ))
    story.append(Spacer(1, 6))
    
    # TDK Electronics (Chirp Microsystems)
    story.append(Paragraph(
        "<b>Software Engineer Intern</b> | TDK Electronics (Chirp Microsystems) | Berkeley, CA | 06/2019 – 08/2019",
        subsection_header
    ))
    story.append(Paragraph(
        "<i>Ultrasonic sensor technology for micro-scale 3D positioning · Python, C++, Data Science</i>",
        body_style
    ))
    story.append(Paragraph(
        "• Developed Python automation scripts for ultrasonic sensor data analysis and testing, reducing manual testing time by 60%",
        bullet_style
    ))
    story.append(Paragraph(
        "• Wrapped C++ tools in Python to enhance prototype usability and accelerate development iteration cycles",
        bullet_style
    ))
    story.append(Paragraph(
        "• Built demo videos and analyzed sensor data for product marketing, enabling products to accurately perceive 3D positioning",
        bullet_style
    ))
    story.append(Spacer(1, 6))
    
    # Projects & Impact
    story.append(Paragraph("KEY TECHNICAL ACHIEVEMENTS", section_header))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceAfter=8))
    
    story.append(Paragraph(
        "• <b>Database Performance Optimization:</b> Reduced query latency from 500ms to sub-100ms through strategic indexing and query optimization across PostgreSQL and Firestore implementations",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Real-time Synchronization:</b> Built distributed system handling 20,000+ daily operations with conflict resolution and offline-first architecture",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Vector Database Research:</b> Designed semantic search infrastructure with embedding models and similarity search algorithms for production applications",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>ML Infrastructure:</b> Built pipelines for model training, fine-tuning, and deployment with focus on data quality and model optimization",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Scalable Architecture:</b> Designed cloud infrastructure supporting 3,000+ concurrent users with auto-scaling and monitoring",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>0-to-1 Product Development:</b> Led two products from concept to profitable production with proven technical execution and user growth",
        bullet_style
    ))
    
    # Build the PDF
    doc.build(story)
    print("✓ Resume PDF created successfully at /mnt/user-data/outputs/Douglas_Seo_Resume_AI_Research.pdf")

if __name__ == "__main__":
    create_resume()
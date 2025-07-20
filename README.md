# Mythiqa

Mythiqa is a full-stack MVP for a collaborative storytelling platform that empowers users to co-author, publish, and explore narrative content—primarily those focused on Fantasy and Science Fiction. The platform combines modern frontend technologies, scalable backend infrastructure, and AI-assisted writing tools to deliver an engaging and intuitive experience for writers and readers alike.

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript  
- **Backend:** FastAPI (Python)  
- **Cloud & Data Storage:** AWS (RDS/PostgreSQL, DynamoDB, S3)  
- **AI Integration:** Google Gemini API for AI-assisted writing tools

---

## Key Features

- **Collaborative Storytelling**  
  Enables several users to co-author stories with several built-in tooling such as generic notes, timelines,.

- **Responsive Frontend**  
  Built with Next.js and Tailwind CSS for a sleek, fast, and mobile-friendly user experience.

- **Hybrid Data Storage Architecture**  
  Uses PostgreSQL for structured metadata, DynamoDB for flexible, fast-access data of unstructured content like story drafts, and S3 for user media.

- **AI-Assisted Writing Tools**  
  Integrates Google Gemini API to provide intelligent assistance with plot ideation, worldbuilding, and character creation.

---

## How It Works

1. Users register and create profiles to start writing stories.  
2. The frontend interacts with FastAPI backend APIs for CRUD operations on stories and user data.  
3. PostgreSQL stores structured data such as user info, story metadata, and permissions.  
4. DynamoDB supports fast retrieval and flexible querying of key story components, such as chapter content, chapter name, and creation date.  
5. AWS S3 stores public images and other media assets such as user profile pictures and book covers.  
6. Google Gemini API powers AI-assisted writing features for plot ideation, worldbuilding, and character creation. However, AI is intentionally not integrated directly into the text editor to encourage writers to create their own stories without over-reliance on AI-generated content.

---

## What I Learned

- Designing hybrid cloud storage solutions combining relational and NoSQL databases for scalable full-stack applications.  
- Building modern server-rendered React apps with Next.js and Tailwind CSS for optimal UX and performance.  
- Developing RESTful APIs using FastAPI and integrating complex cloud services (AWS RDS, DynamoDB, S3).  
- Embedding AI capabilities via Google Gemini API to augment user creativity and content generation.

---

## Note

Mythiqa is currently an MVP under active and rapid development. Features and integrations may evolve as the platform matures. The application is not yet deployed.

---

